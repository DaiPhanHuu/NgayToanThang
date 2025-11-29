const notificationDiv = document.getElementById('notification');

function showNotification(message, isError = false) {
    notificationDiv.textContent = message;
    notificationDiv.style.display = 'block';
    
    setTimeout(() => {
        notificationDiv.style.display = 'none';
    }, 3000);
}

window.addEventListener('load', function() {
    const form = document.getElementById('post-form');
    
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const title = document.getElementById('post-title').value.trim();
            const summary = document.getElementById('post-summary').value.trim();
            const content = window.editor ? window.editor.getContents() : '';
            
            const imageInput = document.getElementById('post-image');
            let imageData = null;
            
            if (imageInput && imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imageData = e.target.result;
                    savePost(title, summary, imageData);
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                savePost(title, summary, null);
            }
            
            return false;
        };
    }
});

function savePost(title, summary, imageData) {
    try {
        if (window.newsSystem) {
            const success = window.newsSystem.addNewsArticle(title, summary, imageData, '#');
            
            if (success) {
                showNotification('✓ Đăng bài thành công!');
                
                document.getElementById('post-form').reset();
                if (window.editor) {
                    window.editor.setContents('');
                }
                
                setTimeout(() => {
                    if (confirm('Bài viết đã được đăng! Bạn có muốn quay về trang chủ?')) {
                        window.location.href = '../index.html';
                    }
                }, 1500);
            } else {
                showNotification('Có lỗi xảy ra!', true);
            }
        }
    } catch (error) {
        showNotification('Lỗi: ' + error.message, true);
    }
}