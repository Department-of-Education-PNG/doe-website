<?php
session_start();
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;700&display=swap" rel="stylesheet">
    <link rel="icon" id="admin-favicon" type="image/png" href="">
    <!-- Lucide Icons -->
    <script src="https://cdn.jsdelivr.net/npm/lucide@0.412.0/dist/umd/lucide.min.js"></script>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: 'Inter', sans-serif;
            min-height: 100dvh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(-45deg, #0e2040, #1a3a5c, #07152d, #1e4b8a);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            color: #fff;
            overflow: hidden;
            position: relative;
        }

        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Ambient Glow Blobs */
        .glow {
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(59, 165, 224, 0.3) 0%, transparent 70%);
            filter: blur(50px);
            z-index: -1;
            animation: moveGlow 20s infinite alternate;
        }
        .glow-1 { top: -100px; left: -100px; }
        .glow-2 { bottom: -100px; right: -100px; background: radial-gradient(circle, rgba(245, 166, 35, 0.2) 0%, transparent 70%); }

        @keyframes moveGlow {
            from { transform: translate(0, 0) scale(1); }
            to { transform: translate(100px, 100px) scale(1.2); }
        }

        .login-container {
            width: 100%;
            max-width: 440px;
            padding: 1.5rem;
            animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .login-card {
            background: rgba(255, 255, 255, 0.03);
            -webkit-backdrop-filter: blur(25px);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 32px;
            padding: 3.5rem 2.8rem;
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05);
            position: relative;
            overflow: hidden;
        }

        .login-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
            transition: 0.5s;
        }

        .login-card:hover::before {
            left: 100%;
        }

        .login-logo {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .login-logo img {
            width: 90px;
            height: 90px;
            object-fit: contain;
            margin-bottom: 1.2rem;
            filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
        }

        .login-logo h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.6rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(to right, #fff, #bce0ff);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .login-logo p {
            font-size: 0.88rem;
            color: rgba(255, 255, 255, 0.45);
            margin-top: 0.4rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .form-group {
            margin-bottom: 1.8rem;
        }

        .form-group label {
            display: block;
            font-size: 0.82rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 0.6rem;
            margin-left: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }

        .form-group input {
            width: 100%;
            padding: 1.1rem 1.4rem;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            color: #fff;
            font-size: 1rem;
            font-family: inherit;
            outline: none;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .form-group input:focus {
            border-color: #3ba5e0;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 4px rgba(59, 165, 224, 0.15), 0 0 20px rgba(59, 165, 224, 0.1);
        }

        .login-btn {
            width: 100%;
            padding: 1.1rem;
            background: linear-gradient(135deg, #0070f3, #00c6ff);
            border: none;
            border-radius: 16px;
            color: #fff;
            font-size: 1.05rem;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 0.8rem;
            letter-spacing: 0.5px;
            box-shadow: 0 10px 30px rgba(0, 112, 243, 0.3);
        }

        .login-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0, 112, 243, 0.5);
            filter: brightness(1.1);
        }

        .login-btn:active {
            transform: translateY(-1px);
        }

        .divider {
            margin: 1.5rem 0;
            display: flex;
            align-items: center;
            text-align: center;
            color: rgba(255, 255, 255, 0.25);
            font-size: 0.75rem;
            font-weight: 700;
        }

        .divider::before, .divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .divider span {
            padding: 0 1rem;
        }

        .google-btn {
            width: 100%;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            color: #fff;
            font-size: 0.95rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .google-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        .google-btn img {
            width: 20px;
            height: 20px;
        }

        .error-message {
            background: rgba(231, 76, 60, 0.1);
            border: 1px solid rgba(231, 76, 60, 0.3);
            color: #ff7675;
            padding: 1rem;
            border-radius: 14px;
            font-size: 0.9rem;
            margin-bottom: 2rem;
            display: none;
            text-align: center;
            animation: shake 0.4s ease;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .login-footer {
            text-align: center;
            margin-top: 2.5rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.3);
        }

        /* Loading Spinner */
        .loading-dot {
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            vertical-align: middle;
            margin-right: 8px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .login-footer a {
            color: #3ba5e0;
            text-decoration: none;
            font-weight: 500;
            transition: 0.3s;
        }
        .login-footer a:hover { color: #fff; }

        /* Desktop Lock */
        .desktop-lock {
            display: none;
            position: fixed;
            inset: 0;
            background: #0e2040;
            color: #fff;
            z-index: 999999;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
        }
        .desktop-lock-content { max-width: 400px; }
        .desktop-lock-icon { font-size: 4rem; margin-bottom: 2rem; display: block; }
        .desktop-lock h2 { font-family: 'Outfit', sans-serif; margin-bottom: 1rem; font-size: 1.8rem; }
        .desktop-lock p { color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 2rem; }
        .desktop-lock-back { color: #0070f3; text-decoration: none; font-weight: 600; }

        @media (max-width: 1024px) {
            .desktop-lock { display: flex; }
            body { overflow: hidden !important; }
        }
    </style>
</head>
<body>
    <div class="desktop-lock">
        <div class="desktop-lock-content">
            <span class="desktop-lock-icon"><i data-lucide="monitor" style="width:48px;height:48px;"></i></span>
            <h2>Desktop Only Access</h2>
            <p>The Department of Education Administrative Panel is restricted to desktop computers for security and management efficiency.</p>
            <a href="../" class="desktop-lock-back">← Return to Public Website</a>
        </div>
    </div>
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>
    <div class="login-container">
        <div class="login-card">
            <div class="login-logo">
                <img src="../assets/images/logo/DoE-Logo.png" alt="DoE Logo" style="width:80px; height:80px; margin-bottom:1rem;">
                <h1>Department of Education</h1>
                <p>Papua New Guinea</p>
            </div>

            <div class="error-message" id="error-msg"></div>

            <form id="login-form">
                <div class="form-group">
                    <label for="username">Username or Email</label>
                    <input type="text" id="username" name="username" placeholder="admin@doe.gov.pg" required autocomplete="username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required autocomplete="current-password">
                </div>
                <button type="submit" class="login-btn" id="login-btn">
                    <i data-lucide="log-in" style="width:20px;height:20px;vertical-align:middle;margin-right:8px;"></i>Sign In
                </button>
            </form>
        </div>
        <div class="login-footer">
            <a href="../">← Back to Website</a> &nbsp;|&nbsp; &copy; 2026 Department of Education
        </div>
    </div>

    <script>
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('login-btn');
            const errorEl = document.getElementById('error-msg');
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            btn.disabled = true;
            btn.innerHTML = '<i class="loading-dot"></i> Signing in...';
            errorEl.style.display = 'none';

            try {
                const response = await fetch('../api/auth.php?action=login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });

                const result = await response.json();

                if (result.success) {
                    window.location.href = 'dashboard.php';
                } else {
                    errorEl.textContent = result.error || 'Invalid credentials';
                    errorEl.style.display = 'block';
                }
            } catch (err) {
                console.error("Auth Error:", err);
                errorEl.textContent = 'Connection failed. Please check your server.';
                errorEl.style.display = 'block';
            }

            btn.disabled = false;
            btn.innerHTML = '<i data-lucide="log-in" style="width:20px;height:20px;vertical-align:middle;margin-right:8px;"></i>Sign In';
            if (window.lucide) lucide.createIcons();
        });
        
        // Init Lucide
        if (window.lucide) lucide.createIcons();

        const loginForm = document.getElementById('login-form');
    </script>
</body>
</html>
