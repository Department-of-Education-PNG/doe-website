<?php
/**
 * Mail (SMTP) Configuration
 * Department of Education - Papua New Guinea
 *
 * Create an email account in cPanel (e.g., noreply@education.gov.pg)
 * and fill in the credentials below.
 */

define('SMTP_HOST', 'mail.education.gov.pg');   // cPanel mail server
define('SMTP_PORT', 465);                        // SSL port (use 587 for TLS)
define('SMTP_ENCRYPTION', 'ssl');                // 'ssl' or 'tls'
define('SMTP_USER', 'noreply@education.gov.pg'); // cPanel email account
define('SMTP_PASS', 'CHANGE_THIS');              // cPanel email password

define('MAIL_FROM_NAME', 'Department of Education PNG');
define('MAIL_FROM_ADDRESS', 'noreply@education.gov.pg');
define('NOTIFY_EMAIL', 'enquiries@education.gov.pg');  // Where contact form notifications go
define('NOTIFY_NAME', 'DoE Enquiries');
