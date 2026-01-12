// Test upload API endpoint
const testUpload = async () => {
    try {
        console.log('Testing upload API endpoint...');
        console.log('Server should be running on http://localhost:3000\n');

        // Create a test image file (1x1 red pixel PNG)
        const testImageData = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==',
            'base64'
        );

        // Create FormData
        const FormData = (await import('form-data')).default;
        const formData = new FormData();
        formData.append('file', testImageData, {
            filename: 'test-image.png',
            contentType: 'image/png',
        });

        // Make upload request
        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData as any,
        });

        const result = await response.json();

        if (response.ok) {
            console.log('✅ Upload successful!');
            console.log('Response:', JSON.stringify(result, null, 2));
            console.log('\n📸 Image URL:', result.url);

            if (result.url) {
                console.log('\n✅ Upload API is working correctly!');
                console.log('The file was uploaded to Supabase Storage.');
            }
        } else {
            console.log('❌ Upload failed');
            console.log('Status:', response.status);
            console.log('Error:', JSON.stringify(result, null, 2));

            if (result.error && result.error.includes('bucket')) {
                console.log('\n⚠️  Storage bucket needs to be created.');
                console.log('Please create a "products" bucket in Supabase Dashboard:');
                console.log('1. Go to https://supabase.com/dashboard/project/ibnydzahapvnmbtgoxha');
                console.log('2. Click Storage → New Bucket');
                console.log('3. Name: products');
                console.log('4. Public bucket: YES');
            }
        }
    } catch (error: any) {
        console.error('❌ Test failed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('\n⚠️  Dev server is not running!');
            console.log('Please run: npm run dev');
        }
    }
};

testUpload();
