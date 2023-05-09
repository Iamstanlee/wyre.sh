const paymentSampleResponse = [
    {
        "data": {
            "id": "cf023d7c-319e-4c5a-aad9-fd2b1eee6ccc",
            "type": "payment",
            "status": "pending",
            "description": "Payment",
            "amount": {
                "amount": "3.14",
                "currency": "USD"
            },
            "createDate": "2023-05-03T02:37:57.633Z",
            "updateDate": "2023-05-03T02:37:57.633Z",
            "merchantId": "76485d79-0534-4a5e-b6e3-2ff737a6ed33",
            "merchantWalletId": "1015984421",
            "source": {
                "id": "b8627ae8-732b-4d25-b947-1df8f4007a29",
                "type": "card"
            },
            "refunds": [],
            "metadata": {
                "phoneNumber": "+14155555555",
                "email": "satoshi@circle.com"
            },
            "channel": "ba943ff1-ca16-49b2-ba55-1057e70ca5c7"
        }
    }
]

const paymentSampleRequest = [
    {
        method: 'POST',
        url: 'https://api-sandbox.circle.com/v1/payments',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer SAND_API_KEY:9375ffcfeec159fd669346f97a592527:8e2266aaba2b04b06c1309b3dd16d2ab'
        },
        data: {
            metadata: {
                email: 'satoshi@circle.com',
                phoneNumber: '+14155555555',
                sessionId: 'DE6FA86F60BB47B379307F851E238617',
                ipAddress: '244.28.239.130'
            },
            amount: { currency: 'USD', amount: '3.14' },
            autoCapture: true,
            source: { type: 'card', id: 'b8627ae8-732b-4d25-b947-1df8f4007a29' },
            idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
            keyId: 'key1',
            verification: 'cvv',
            verificationSuccessUrl: 'https://www.example.com/3ds/verificationsuccessful',
            verificationFailureUrl: 'https://www.example.com/3ds/verificationfailure',
            description: 'Payment',
            encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA==',
            channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'
        }
    }
]