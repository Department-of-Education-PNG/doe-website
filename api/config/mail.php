<?php
/**
 * Mail (SMTP) Configuration
 * Department of Education - Papua New Guinea
 */

define('SMTP_HOST', 'demo2.education.gov.pg');   // cPanel mail server
define('SMTP_PORT', 465);                        // SSL port (use 587 for TLS)
define('SMTP_ENCRYPTION', 'ssl');                // 'ssl' or 'tls'
define('SMTP_USER', 'noreply@demo2.education.gov.pg'); // cPanel email account
define('SMTP_PASS', 'ezXg~t,!#~5T}q0G');         // Authenticated password

define('MAIL_FROM_NAME', 'DoE Portal (Joel Namuri)');
define('MAIL_FROM_ADDRESS', 'noreply@demo2.education.gov.pg');
define('NOTIFY_EMAIL', 'joel_namuri@education.gov.pg');
define('NOTIFY_NAME', 'Joel Namuri');
