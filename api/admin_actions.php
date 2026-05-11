<?php
/**
 * Admin Actions — Daily Backups & DB Management
 */
session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

// Strict Admin Check
requireAuth();

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'backup':
        try {
            $pdo = Database::getInstance()->getConnection();
            $tables = [];
            $result = $pdo->query("SHOW TABLES");
            while ($row = $result->fetch(PDO::FETCH_NUM)) {
                $tables[] = $row[0];
            }

            $sql = "-- Department of Education PNG — Database Backup\n";
            $sql .= "-- Generated at: " . date('Y-m-d H:i:s') . "\n\n";
            $sql .= "SET FOREIGN_KEY_CHECKS=0;\n\n";

            foreach ($tables as $table) {
                // Get Create Table
                $res = $pdo->query("SHOW CREATE TABLE `$table`")->fetch(PDO::FETCH_ASSOC);
                $sql .= "\n\n" . $res['Create Table'] . ";\n\n";

                // Get Data
                $result = $pdo->query("SELECT * FROM `$table` ");
                $numFields = $result->columnCount();

                while ($row = $result->fetch(PDO::FETCH_NUM)) {
                    $sql .= "INSERT INTO `$table` VALUES(";
                    for ($j = 0; $j < $numFields; $j++) {
                        if (isset($row[$j])) {
                            // Escape strings
                            $val = str_replace("\n", "\\n", addslashes($row[$j]));
                            $sql .= '"' . $val . '"';
                        } else {
                            $sql .= 'NULL';
                        }
                        if ($j < ($numFields - 1)) {
                            $sql .= ',';
                        }
                    }
                    $sql .= ");\n";
                }
            }
            $sql .= "\n\nSET FOREIGN_KEY_CHECKS=1;\n";

            // Headers for download
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="doe_backup_' . date('Y_m_d_His') . '.sql"');
            header('Pragma: no-cache');
            header('Expires: 0');

            echo $sql;
            exit;

        } catch (Exception $e) {
            error_log('Backup failed: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Backup generation failed. Check server logs.']);
            exit;
        }
        break;

    default:
        jsonError('Invalid action');
}
