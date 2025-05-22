// MinIO客户端配置和工具函数
class MinioGallery {
    constructor(config) {
        this.endpoint = config.endpoint;
        this.accessKey = config.accessKey;
        this.secretKey = config.secretKey;
        this.bucketName = config.bucketName;
        this.useSSL = config.useSSL;
    }

    // 获取预签名URL
    async getPresignedUrl(objectName) {
        const url = `${this.useSSL ? 'https' : 'http'}://${this.endpoint}/${this.bucketName}/${objectName}`;
        // 添加认证信息
        const date = new Date().toUTCString();
        const stringToSign = `GET\n\n\n${date}\n/${this.bucketName}/${objectName}`;
        
        // 使用CryptoJS进行签名（需要引入CryptoJS库）
        const signature = CryptoJS.HmacSHA1(stringToSign, this.secretKey);
        const encodedSignature = signature.toString(CryptoJS.enc.Base64);

        return `${url}?AWSAccessKeyId=${encodeURIComponent(this.accessKey)}&Expires=3600&Signature=${encodeURIComponent(encodedSignature)}`;
    }

    // 列出存储桶中的所有图片
    async listImages() {
        try {
            const response = await fetch(`${this.useSSL ? 'https' : 'http'}://${this.endpoint}/${this.bucketName}?list-type=2`, {
                headers: {
                    'Authorization': `AWS ${this.accessKey}:${this.getAuthorizationSignature()}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to list objects');
            }

            const data = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const contents = xmlDoc.getElementsByTagName('Contents');
            
            return Array.from(contents).map(content => {
                const key = content.getElementsByTagName('Key')[0].textContent;
                return {
                    name: key,
                    url: this.getPresignedUrl(key)
                };
            });
        } catch (error) {
            console.error('Error listing images:', error);
            return [];
        }
    }

    // 获取认证签名
    getAuthorizationSignature() {
        const date = new Date().toUTCString();
        const stringToSign = `GET\n\n\n${date}\n/${this.bucketName}`;
        const signature = CryptoJS.HmacSHA1(stringToSign, this.secretKey);
        return signature.toString(CryptoJS.enc.Base64);
    }
}

// 导出MinioGallery类
window.MinioGallery = MinioGallery;