<?php

namespace App\Rules;

use GuzzleHttp\Client;
use Illuminate\Contracts\Validation\Rule;

class CaptchaRule implements Rule
{
    /**
     * @param string $attribute
     * @param string $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (env('APP_ENV') === 'testing') {
            return true;
        }

        $client = new Client();

        $response = $client->post('https://www.google.com/recaptcha/api/siteverify', [
            'verify' => false,
            'form_params' => [
                'secret' => env('GOOGLE_CAPTCHA_SERVER'),
                'response' => $value,
            ],
        ]);

        $result = @json_decode($response->getBody()->getContents(), true);

        return array_key_exists('success', (array)$result) && $result['success'] === true;
    }

    /**
     * @return string
     */
    public function message()
    {
        return 'This captcha key is not correct';
    }
}
