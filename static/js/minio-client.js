class MinioGallery {
    constructor(config) {
        this.endpoint = config.endpoint;
        this.bucketName = config.bucketName;
        this.useSSL = config.useSSL ?? false;
        console.log('MinioGallery初始化:', {
            endpoint: this.endpoint,
            bucketName: this.bucketName,
            useSSL: this.useSSL
        });
    }
    
    async testConnection() {
        const protocol = this.useSSL ? 'https' : 'http';
        const url = `${protocol}://${this.endpoint}/${this.bucketName}`;
        console.log('测试MinIO连接:', url);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
        
        try {
            const response = await fetch(url, {
                method: 'HEAD',
                signal: controller.signal,
                mode: 'cors'
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`服务器响应错误: ${response.status} ${response.statusText}`);
            }
            
            return true;
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('MinIO连接测试失败:', error);
            throw new Error(error.name === 'AbortError' ? '连接超时' : error.message);
        }
    }

    async listImages() {
        try {
            const protocol = this.useSSL ? 'https' : 'http';
            const url = `${protocol}://${this.endpoint}/${this.bucketName}?list-type=2`;
            console.log('正在请求MinIO API:', url);

            // 添加超时和错误处理
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
            
            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                    mode: 'cors', // 尝试启用CORS
                    headers: {
                        'Accept': 'application/xml'
                    }
                });
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('MinIO API请求失败:', {
                        status: response.status,
                        statusText: response.statusText,
                        errorText: errorText
                    });
                    throw new Error(`MinIO API请求失败: ${response.status} ${response.statusText}`);
                }

                const data = await response.text();
                console.log('MinIO API响应数据前50个字符:', data.substring(0, 50));
                
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'text/xml');
                
                // 检查XML解析错误
                const parserError = xmlDoc.querySelector('parsererror');
                if (parserError) {
                    console.error('XML解析错误:', parserError.textContent);
                    throw new Error('XML解析错误: ' + parserError.textContent);
                }
                
                const contents = xmlDoc.getElementsByTagName('Contents');
                console.log('找到的Contents元素数量:', contents.length);

                const imageList = Array.from(contents)
                    .map(item => {
                        const keyElement = item.getElementsByTagName('Key')[0];
                        return keyElement ? keyElement.textContent : null;
                    })
                    .filter(key => key && !key.endsWith('/') && /\.(jpe?g|png|gif|webp)$/i.test(key))
                    .map(key => ({
                        name: key,
                        url: `${protocol}://${this.endpoint}/${this.bucketName}/${key}`
                    }));

                console.log('过滤后的图片数量:', imageList.length);
                return imageList;
            } catch (fetchError) {
                clearTimeout(timeoutId);
                if (fetchError.name === 'AbortError') {
                    throw new Error('MinIO API请求超时');
                }
                throw fetchError;
            }
        } catch (error) {
            console.error('listImages方法错误:', error);
            throw error;
        }
    }
}

window.MinioGallery = MinioGallery;
