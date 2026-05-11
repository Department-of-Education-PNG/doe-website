<?php
/**
 * Admin Users Management API
 * CRUD for administrative accounts with logging.
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();

try {
    $pdo = Database::getInstance()->getConnection();
    $action = $_GET['action'] ?? '';

    // STRICTLY REQUIRE SUPER ADMIN FOR ALL USER MANAGEMENT
    requireRole('super_admin');

    switch ($action) {
        case 'list':
            // Fetch all users except password hashes
            $stmt = $pdo->query("SELECT id, username, full_name, email, role, last_login, created_at FROM admin_users ORDER BY id ASC");
            jsonResponse(['data' => $stmt->fetchAll()]);
            break;

        case 'get':
            if (!isset($_GET['id'])) jsonError('ID missing');
            $stmt = $pdo->prepare("SELECT id, username, full_name, email, role, last_login, created_at FROM admin_users WHERE id = ?");
            $stmt->execute([(int)$_GET['id']]);
            $user = $stmt->fetch();
            if (!$user) jsonError('User not found', 404);
            jsonResponse($user);
            break;

        case 'create':
            $data = getPostData();
            validateRequired($data, ['username', 'password', 'full_name', 'email', 'role']);
            
            // Check uniqueness
            $check = $pdo->prepare("SELECT COUNT(*) FROM admin_users WHERE username = ?");
            $check->execute([sanitize($data['username'])]);
            if ($check->fetchColumn() > 0) jsonError('Username already exists');

            $hash = password_hash($data['password'], PASSWORD_BCRYPT);
            
            $stmt = $pdo->prepare("INSERT INTO admin_users (username, full_name, email, role, password_hash) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                sanitize($data['username']),
                sanitize($data['full_name']),
                sanitize($data['email']),
                sanitize($data['role'] ?? 'editor'),
                $hash
            ]);
            
            $newId = $pdo->lastInsertId();
            logActivity('CREATE', 'admin_users', $newId, "Created new admin user: " . $data['username'] . " (" . $data['full_name'] . ")");
            
            jsonResponse(['success' => true, 'id' => $newId], 201);
            break;

        case 'update':
            $data = getPostData();
            validateRequired($data, ['id', 'username', 'full_name', 'email', 'role']);

            $params = [
                sanitize($data['username']),
                sanitize($data['full_name']),
                sanitize($data['email']),
                sanitize($data['role'] ?? 'editor')
            ];
            $sql = "UPDATE admin_users SET username=?, full_name=?, email=?, role=? ";

            // Optional password update
            if (!empty($data['password'])) {
                $sql .= ", password_hash=? ";
                $params[] = password_hash($data['password'], PASSWORD_BCRYPT);
            }

            $sql .= " WHERE id=?";
            $params[] = (int)$data['id'];

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            logActivity('UPDATE', 'admin_users', $data['id'], "Updated user profile: " . $data['username']);
            
            jsonResponse(['success' => true]);
            break;

        case 'delete':
            $data = getPostData();
            validateRequired($data, ['id']);
            
            // Prevent self-deletion
            if ((int)$data['id'] === (int)$_SESSION['admin_id']) {
                jsonError('You cannot delete your own account');
            }

            // Get username for log before deleting
            $stmt = $pdo->prepare("SELECT username FROM admin_users WHERE id = ?");
            $stmt->execute([(int)$data['id']]);
            $uname = $stmt->fetchColumn();

            $pdo->prepare("DELETE FROM admin_users WHERE id = ?")->execute([(int)$data['id']]);
            
            logActivity('DELETE', 'admin_users', $data['id'], "Deleted admin user: " . $uname);
            
            jsonResponse(['success' => true]);
            break;

        case 'activity_logs':
            // Special case for fetching logs
            $pagination = getPagination();
            $stmt = $pdo->prepare("SELECT * FROM admin_activity_logs ORDER BY created_at DESC LIMIT ? OFFSET ?");
            $stmt->bindValue(1, $pagination['limit'], PDO::PARAM_INT);
            $stmt->bindValue(2, $pagination['offset'], PDO::PARAM_INT);
            $stmt->execute();
            jsonResponse(['data' => $stmt->fetchAll()]);
            break;

        default:
            jsonError('Invalid action');
    }
} catch (Exception $e) {
    jsonError('DB Error: ' . $e->getMessage());
}
