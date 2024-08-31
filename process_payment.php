<?php
require 'vendor/autoload.php';

\Stripe\Stripe::setApiKey('your_stripe_secret_key');

$plan = $_POST['plan'];
$cardNumber = $_POST['card-number'];
$expiryDate = $_POST['expiry-date'];
$cvv = $_POST['cvv'];
$cardName = $_POST['card-name'];

// Map plan to the amount (in cents)
$plans = [
    'basic' => 2500,
    'standard' => 4200,
    'premium' => 6000,
    'exclusive' => 9000
];

$amount = $plans[$plan];

// Convert expiry date to correct format
$expiry = explode('/', $expiryDate);
$expMonth = $expiry[0];
$expYear = '20' . $expiry[1];

try {
    $token = \Stripe\Token::create([
        'card' => [
            'number' => $cardNumber,
            'exp_month' => $expMonth,
            'exp_year' => $expYear,
            'cvc' => $cvv,
            'name' => $cardName,
        ],
    ]);

    $charge = \Stripe\Charge::create([
        'amount' => $amount,
        'currency' => 'usd',
        'description' => ucfirst($plan) . ' Plan Membership',
        'source' => $token,
    ]);

    // Handle successful payment
    echo 'Payment successful! Thank you for your purchase.';
} catch (\Stripe\Exception\CardException $e) {
    // Handle card errors
    echo 'Payment failed: ' . $e->getError()->message;
}
?>


<?php
session_start();
$csrfToken = bin2hex(random_bytes(32));
$_SESSION['csrf_token'] = $csrfToken;
?>
<form action="process_payment.php" method="POST" id="payment-form">
    <input type="hidden" name="csrf_token" value="<?php echo $csrfToken; ?>">
    <!-- Other form fields -->
</form>


// In process_payment.php
session_start();
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    die('CSRF validation failed.');
}


header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
