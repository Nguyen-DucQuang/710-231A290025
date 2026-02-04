// Navigation menu toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });

    // FAQ toggle (contact page)
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');

            // Close other open FAQs
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const a = item.querySelector('.faq-answer');
                    if (a) a.classList.remove('active');
                }
            });

            // Toggle current FAQ
            faqItem.classList.toggle('active');
            if (answer) answer.classList.toggle('active');
        });
    });

    // Contact form handling (guarded)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const messageStatus = document.getElementById('contactMessageStatus');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = (document.getElementById('contactName') || {}).value || '';
            const email = (document.getElementById('contactEmail') || {}).value || '';
            const subject = (document.getElementById('contactSubject') || {}).value || '';
            const message = (document.getElementById('contactMessage') || {}).value || '';

            if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
                if (messageStatus) {
                    messageStatus.textContent = 'Vui lòng điền đầy đủ tất cả các trường bắt buộc.';
                    messageStatus.className = 'contact-message error';
                }
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (messageStatus) {
                    messageStatus.textContent = 'Email không hợp lệ. Vui lòng kiểm tra lại.';
                    messageStatus.className = 'contact-message error';
                }
                return;
            }

            if (messageStatus) {
                messageStatus.textContent = 'Đang gửi tin nhắn...';
                messageStatus.className = 'contact-message';
            }

            setTimeout(() => {
                if (messageStatus) {
                    messageStatus.textContent = 'Cảm ơn bạn! Tin nhắn đã được gửi thành công. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.';
                    messageStatus.className = 'contact-message success';
                }
                contactForm.reset();
                localStorage.removeItem('contactFormDraft');

                setTimeout(() => {
                    if (messageStatus) messageStatus.className = 'contact-message';
                }, 5000);
            }, 1500);
        });

        // Save draft on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                const formData = {
                    name: (document.getElementById('contactName') || {}).value || '',
                    email: (document.getElementById('contactEmail') || {}).value || '',
                    subject: (document.getElementById('contactSubject') || {}).value || '',
                    message: (document.getElementById('contactMessage') || {}).value || ''
                };
                localStorage.setItem('contactFormDraft', JSON.stringify(formData));
            });
        });

        // Load saved draft
        const savedData = localStorage.getItem('contactFormDraft');
        if (savedData) {
            try {
                const formData = JSON.parse(savedData);
                if (formData) {
                    if (document.getElementById('contactName')) document.getElementById('contactName').value = formData.name || '';
                    if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = formData.email || '';
                    if (document.getElementById('contactSubject')) document.getElementById('contactSubject').value = formData.subject || '';
                    if (document.getElementById('contactMessage')) document.getElementById('contactMessage').value = formData.message || '';
                }
            } catch (e) {
                // ignore parse errors
            }
        }
    }
});