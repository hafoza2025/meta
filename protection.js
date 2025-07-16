/*!
 * Site Protection System v2.0
 * حماية شاملة للموقع من أدوات المطور والنسخ
 * تشفير متعدد الطبقات
 */

(function () {
    'use strict';

    // ===== نظام الحماية الشامل =====
    const SiteProtection = {
        // إعدادات الحماية
        config: {
            enableDevToolsProtection: true,
            enableRightClickProtection: true,
            enableKeyboardProtection: true,
            enableCopyProtection: true,
            enableConsoleProtection: true,
            enableSourceProtection: true,
            redirectOnDetection: false,
            warningMessage: '🚫 هذا الموقع محمي بواسطة قانون حقوق الملكيه الفكرية واي تجاوز يتم رصده سيتم تبليغ الجهات المختصة - غير مسموح بالوصول للكود المصدري '
        },

        // مفاتيح التشفير
        keys: {
            primary: 'MetaSoftware2024Protection',
            secondary: Math.random().toString(36).substring(2, 15),
            dynamic: Date.now().toString(36)
        },

        // ===== دوال التشفير =====
        encryption: {
            // تشفير XOR
            xorEncrypt: function (text, key) {
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    result += String.fromCharCode(
                        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                    );
                }
                return result;
            },

            // تشفير Base64 متقدم
            advancedBase64: function (text) {
                const encoded = btoa(unescape(encodeURIComponent(text)));
                return encoded.split('').reverse().join('');
            },

            // فك تشفير Base64 متقدم
            decodeAdvancedBase64: function (text) {
                const reversed = text.split('').reverse().join('');
                return decodeURIComponent(escape(atob(reversed)));
            },

            // تشفير متعدد الطبقات
            multiLayerEncrypt: function (text, key) {
                let encrypted = text;
                encrypted = this.xorEncrypt(encrypted, key);
                encrypted = this.advancedBase64(encrypted);
                encrypted = this.xorEncrypt(encrypted, key.split('').reverse().join(''));
                return encrypted;
            },

            // فك تشفير متعدد الطبقات
            multiLayerDecrypt: function (encryptedText, key) {
                try {
                    let decrypted = encryptedText;
                    decrypted = this.xorEncrypt(decrypted, key.split('').reverse().join(''));
                    decrypted = this.decodeAdvancedBase64(decrypted);
                    decrypted = this.xorEncrypt(decrypted, key);
                    return decrypted;
                } catch (e) {
                    return null;
                }
            }
        },

        // ===== حماية أدوات المطور =====
        devToolsProtection: {
            isOpen: false,

            // كشف أدوات المطور بطرق متعددة
            detect: function () {
                const self = this;

                // الطريقة الأولى: مراقبة حجم النافذة
                setInterval(function () {
                    const heightThreshold = window.outerHeight - window.innerHeight > 160;
                    const widthThreshold = window.outerWidth - window.innerWidth > 160;

                    if (heightThreshold || widthThreshold) {
                        if (!self.isOpen) {
                            self.isOpen = true;
                            SiteProtection.handleDetection('devtools');
                        }
                    } else {
                        self.isOpen = false;
                    }
                }, 500);

                // الطريقة الثانية: console.log trap
                let devtools = false;
                const img = new Image();
                Object.defineProperty(img, 'id', {
                    get: function () {
                        devtools = true;
                        SiteProtection.handleDetection('console');
                    }
                });

                setInterval(function () {
                    console.clear();
                    console.log(img);
                }, 1000);

                // الطريقة الثالثة: debugger trap
                setInterval(function () {
                    const start = performance.now();
                    debugger;
                    const end = performance.now();
                    if (end - start > 100) {
                        SiteProtection.handleDetection('debugger');
                    }
                }, 3000);

                // الطريقة الرابعة: toString trap
                const element = new Image();
                element.__defineGetter__('id', function () {
                    SiteProtection.handleDetection('toString');
                });

                setInterval(function () {
                    console.log(element);
                }, 2000);
            },

            // منع اختصارات لوحة المفاتيح
            preventKeyboardShortcuts: function () {
                document.addEventListener('keydown', function (e) {
                    // F12
                    if (e.keyCode === 123) {
                        e.preventDefault();
                        SiteProtection.handleDetection('f12');
                        return false;
                    }

                    // Ctrl+Shift+I (Developer Tools)
                    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                        e.preventDefault();
                        SiteProtection.handleDetection('ctrl_shift_i');
                        return false;
                    }

                    // Ctrl+Shift+J (Console)
                    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                        e.preventDefault();
                        SiteProtection.handleDetection('ctrl_shift_j');
                        return false;
                    }

                    // Ctrl+U (View Source)
                    if (e.ctrlKey && e.keyCode === 85) {
                        e.preventDefault();
                        SiteProtection.handleDetection('ctrl_u');
                        return false;
                    }

                    // Ctrl+S (Save Page)
                    if (e.ctrlKey && e.keyCode === 83) {
                        e.preventDefault();
                        SiteProtection.handleDetection('ctrl_s');
                        return false;
                    }

                    // Ctrl+A (Select All)
                    if (e.ctrlKey && e.keyCode === 65) {
                        e.preventDefault();
                        return false;
                    }

                    // Ctrl+C (Copy)
                    if (e.ctrlKey && e.keyCode === 67) {
                        e.preventDefault();
                        return false;
                    }

                    // Ctrl+V (Paste)
                    if (e.ctrlKey && e.keyCode === 86) {
                        e.preventDefault();
                        return false;
                    }

                    // Ctrl+X (Cut)
                    if (e.ctrlKey && e.keyCode === 88) {
                        e.preventDefault();
                        return false;
                    }
                });
            }
        },

        // ===== حماية الماوس =====
        mouseProtection: {
            // منع الضغط بالزر الأيمن
            preventRightClick: function () {
                document.addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                    SiteProtection.handleDetection('rightclick');
                    return false;
                });
            },

            // منع التحديد
            preventSelection: function () {
                document.addEventListener('selectstart', function (e) {
                    e.preventDefault();
                    return false;
                });

                document.addEventListener('mousedown', function (e) {
                    if (e.detail > 1) {
                        e.preventDefault();
                        return false;
                    }
                });
            },

            // منع السحب والإفلات
            preventDragDrop: function () {
                document.addEventListener('dragstart', function (e) {
                    e.preventDefault();
                    return false;
                });

                document.addEventListener('drop', function (e) {
                    e.preventDefault();
                    return false;
                });
            }
        },

        // ===== حماية النسخ =====
        copyProtection: {
            // منع النسخ
            preventCopy: function () {
                document.addEventListener('copy', function (e) {
                    e.clipboardData.setData('text/plain', 'النسخ غير مسموح');
                    e.preventDefault();
                    SiteProtection.handleDetection('copy');
                    return false;
                });

                document.addEventListener('cut', function (e) {
                    e.preventDefault();
                    return false;
                });

                document.addEventListener('paste', function (e) {
                    e.preventDefault();
                    return false;
                });
            },

            // حماية النص
            protectText: function () {
                const style = document.createElement('style');
                style.innerHTML = `
                    * {
                        -webkit-user-select: none !important;
                        -moz-user-select: none !important;
                        -ms-user-select: none !important;
                        user-select: none !important;
                        -webkit-touch-callout: none !important;
                        -webkit-tap-highlight-color: transparent !important;
                    }
                    
                    *::selection {
                        background: transparent !important;
                    }
                    
                    *::-moz-selection {
                        background: transparent !important;
                    }
                `;
                document.head.appendChild(style);
            }
        },

        // ===== حماية Console =====
        consoleProtection: {
            // تعطيل console
            disableConsole: function () {
                const noop = function () { };
                const methods = [
                    'log', 'warn', 'error', 'info', 'debug', 'trace',
                    'dir', 'dirxml', 'table', 'clear', 'count', 'time',
                    'timeEnd', 'group', 'groupEnd', 'groupCollapsed'
                ];

                methods.forEach(function (method) {
                    console[method] = noop;
                });

                // منع إنشاء console جديد
                Object.defineProperty(window, 'console', {
                    value: console,
                    writable: false,
                    configurable: false
                });
            },

            // حماية من eval و Function
            preventCodeExecution: function () {
                window.eval = function () {
                    SiteProtection.handleDetection('eval');
                    return null;
                };

                window.Function = function () {
                    SiteProtection.handleDetection('function');
                    return function () { };
                };

                // منع setTimeout و setInterval مع strings
                const originalSetTimeout = window.setTimeout;
                const originalSetInterval = window.setInterval;

                window.setTimeout = function (func, delay) {
                    if (typeof func === 'string') {
                        SiteProtection.handleDetection('setTimeout_string');
                        return;
                    }
                    return originalSetTimeout.apply(this, arguments);
                };

                window.setInterval = function (func, delay) {
                    if (typeof func === 'string') {
                        SiteProtection.handleDetection('setInterval_string');
                        return;
                    }
                    return originalSetInterval.apply(this, arguments);
                };
            }
        },

        // ===== حماية المصدر =====
        sourceProtection: {
            // تشفير المحتوى
            encryptContent: function () {
                // تشفير جميع النصوص
                const textNodes = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );

                const nodes = [];
                let node;
                while (node = textNodes.nextNode()) {
                    if (node.textContent.trim()) {
                        nodes.push(node);
                    }
                }

                nodes.forEach(function (node) {
                    const encrypted = SiteProtection.encryption.multiLayerEncrypt(
                        node.textContent,
                        SiteProtection.keys.primary
                    );
                    node.textContent = '';

                    // فك التشفير بعد تأخير قصير
                    setTimeout(function () {
                        const decrypted = SiteProtection.encryption.multiLayerDecrypt(
                            encrypted,
                            SiteProtection.keys.primary
                        );
                        if (decrypted) {
                            node.textContent = decrypted;
                        }
                    }, Math.random() * 100);
                });
            },

            // إخفاء HTML
            obfuscateHTML: function () {
                const originalHTML = document.documentElement.outerHTML;
                const encrypted = SiteProtection.encryption.multiLayerEncrypt(
                    originalHTML,
                    SiteProtection.keys.secondary
                );

                // تخزين النسخة المشفرة
                document.documentElement.setAttribute('data-encrypted', encrypted);
            }
        },

        // ===== معالجة الكشف =====
        handleDetection: function (type) {
            console.clear();

            // إظهار رسالة تحذير
            this.showWarning(type);

            // إجراءات إضافية حسب النوع
            switch (type) {
                case 'devtools':
                case 'console':
                case 'debugger':
                case 'f12':
                    this.blockDevTools();
                    break;
                case 'rightclick':
                    this.showContextWarning();
                    break;
                case 'copy':
                    this.showCopyWarning();
                    break;
                default:
                    this.showGenericWarning();
            }

            // إعادة توجيه إذا كان مفعلاً
            if (this.config.redirectOnDetection) {
                setTimeout(function () {
                    window.location.href = 'about:blank';
                }, 3000);
            }
        },

        // ===== رسائل التحذير =====
        showWarning: function (type) {
            const warningDiv = document.createElement('div');
            warningDiv.id = 'protection-warning';
            warningDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: Arial, sans-serif;
                    font-size: 24px;
                    text-align: center;
                    z-index: 999999;
                    backdrop-filter: blur(10px);
                ">
                    <div style="
                        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
                        padding: 40px;
                        border-radius: 20px;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                        max-width: 600px;
                        animation: shake 0.5s ease-in-out;
                    ">
                        <h1 style="margin: 0 0 20px 0; font-size: 2em;">🚫</h1>
                        <h2 style="margin: 0 0 20px 0; color: #fff;">تحذير أمني</h2>
                        <p style="margin: 0; line-height: 1.6; font-size: 18px;">
                            ${this.config.warningMessage}
                        </p>
                        <p style="margin: 20px 0 0 0; font-size: 14px; opacity: 0.8;">
                            نوع المحاولة: ${type}
                        </p>
                    </div>
                </div>
                <style>
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-10px); }
                        75% { transform: translateX(10px); }
                    }
                </style>
            `;

            // إزالة التحذير السابق إن وجد
            const existingWarning = document.getElementById('protection-warning');
            if (existingWarning) {
                existingWarning.remove();
            }

            document.body.appendChild(warningDiv);

            // إزالة التحذير بعد 3 ثوان
            setTimeout(function () {
                if (warningDiv.parentNode) {
                    warningDiv.remove();
                }
            }, 3000);
        },

        blockDevTools: function () {
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: monospace;
                    font-size: 20px;
                    text-align: center;
                    z-index: 999999;
                ">
                    <h1>🔒 الموقع محمي</h1>
                    <p>غير مسموح بفتح أدوات المطور</p>
                    <p style="font-size: 14px; opacity: 0.7; margin-top: 20px;">
                        أغلق أدوات المطور وأعد تحميل الصفحة
                    </p>
                </div>
            `;
        },

        showContextWarning: function () {
            // رسالة مخصصة للضغط بالزر الأيمن
        },

        showCopyWarning: function () {
            // رسالة مخصصة للنسخ
        },

        showGenericWarning: function () {
            // رسالة عامة
        },

        // ===== تهيئة النظام =====
        init: function () {
            const self = this;

            // تطبيق الحماية عند تحميل DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () {
                    self.applyProtection();
                });
            } else {
                self.applyProtection();
            }

            // تطبيق الحماية عند تحميل النافذة
            window.addEventListener('load', function () {
                self.applyProtection();
            });

            // مراقبة تغييرات DOM
            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'childList') {
                        self.protectNewElements(mutation.addedNodes);
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        },

        applyProtection: function () {
            console.clear();

            if (this.config.enableDevToolsProtection) {
                this.devToolsProtection.detect();
            }

            if (this.config.enableKeyboardProtection) {
                this.devToolsProtection.preventKeyboardShortcuts();
            }

            if (this.config.enableRightClickProtection) {
                this.mouseProtection.preventRightClick();
                this.mouseProtection.preventSelection();
                this.mouseProtection.preventDragDrop();
            }

            if (this.config.enableCopyProtection) {
                this.copyProtection.preventCopy();
                this.copyProtection.protectText();
            }

            if (this.config.enableConsoleProtection) {
                this.consoleProtection.disableConsole();
                this.consoleProtection.preventCodeExecution();
            }

            if (this.config.enableSourceProtection) {
                this.sourceProtection.obfuscateHTML();
                setTimeout(() => {
                    this.sourceProtection.encryptContent();
                }, 1000);
            }

            // رسالة في console
            setTimeout(function () {
                console.clear();
                console.log('%c🔒 Site Protection System Active',
                    'color: #ff6b6b; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
                console.log('%cهذا الموقع محمي بنظام حماية متقدم',
                    'color: #ffa500; font-size: 16px; font-weight: bold;');
                console.log('%cأي محاولة للوصول للكود المصدري ستؤدي إلى حظر الوصول',
                    'color: #ff4757; font-size: 14px;');
            }, 2000);
        },

        protectNewElements: function (nodes) {
            // حماية العناصر الجديدة المضافة للصفحة
            nodes.forEach(function (node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // تطبيق حماية النص
                    node.style.userSelect = 'none';
                    node.style.webkitUserSelect = 'none';
                    node.style.mozUserSelect = 'none';
                    node.style.msUserSelect = 'none';
                }
            });
        }
    };

    // ===== تشغيل نظام الحماية =====
    SiteProtection.init();

    // حماية النظام نفسه من التعديل
    Object.freeze(SiteProtection);

    // منع الوصول للنظام من console
    delete window.SiteProtection;

})();

// ===== حماية إضافية =====
// منع فتح نوافذ جديدة للكود المصدري
(function () {
    const originalOpen = window.open;
    window.open = function () {
        console.log('🚫 فتح النوافذ الجديدة محظور');
        return null;
    };
})();

// منع print
window.addEventListener('beforeprint', function (e) {
    e.preventDefault();
    console.log('🚫 الطباعة محظورة');
    return false;
});

// حماية من iframe
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

console.log('🛡️ Site Protection System Loaded Successfully');
/*!
 * Complete Site Protection System v3.0
 * نظام حماية شامل للموقع - جميع الأدوات في ملف واحد
 * يحتوي على: حماية أدوات المطور، تشفير الكود، منع النسخ، حماية المصدر
 */

(function () {
    'use strict';

    // ===== إعدادات التليجرام =====
    const TELEGRAM_CONFIG = {
        BOT_TOKEN: '7829090712:AAEsWLymxnoQqS7g_FuHGL0mypcLsM7Avsw', // ضع توكن البوت هنا
        CHAT_ID: '8146437115',     // ضع Chat ID هنا
        ENABLED: true
    };

    // ===== نظام الحماية الشامل =====
    const CompleteProtection = {
        // إعدادات الحماية
        config: {
            enableDevToolsProtection: true,
            enableRightClickProtection: true,
            enableKeyboardProtection: true,
            enableCopyProtection: true,
            enableConsoleProtection: true,
            enableSourceProtection: true,
            enableTelegramNotifications: true,
            forceEnglishLanguage: true,
            redirectOnDetection: false,
            warningMessage: '🚫 هذا الموقع محمي - غير مسموح بالوصول للكود المصدري'
        },

        // مفاتيح التشفير المتقدمة
        keys: {
            primary: 'MetaSoftware2024AdvancedProtection',
            secondary: Math.random().toString(36).substring(2, 15),
            dynamic: Date.now().toString(36),
            telegram: 'TelegramSecureKey2024'
        },

        // ===== نظام التشفير المتقدم =====
        encryption: {
            // تشفير XOR متقدم
            xorEncrypt: function (text, key) {
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    result += String.fromCharCode(
                        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                    );
                }
                return result;
            },

            // تشفير Base64 مع التشويش
            obfuscatedBase64: function (text) {
                const encoded = btoa(unescape(encodeURIComponent(text)));
                return encoded.split('').reverse().join('').replace(/=/g, '_');
            },

            // فك تشفير Base64 المشوش
            deobfuscatedBase64: function (text) {
                const restored = text.replace(/_/g, '=').split('').reverse().join('');
                return decodeURIComponent(escape(atob(restored)));
            },

            // تشفير متعدد الطبقات
            multiLayerEncrypt: function (text, key) {
                let encrypted = text;
                // طبقة 1: XOR
                encrypted = this.xorEncrypt(encrypted, key);
                // طبقة 2: Base64 مشوش
                encrypted = this.obfuscatedBase64(encrypted);
                // طبقة 3: XOR مرة أخرى بمفتاح معكوس
                encrypted = this.xorEncrypt(encrypted, key.split('').reverse().join(''));
                return encrypted;
            },

            // فك تشفير متعدد الطبقات
            multiLayerDecrypt: function (encryptedText, key) {
                try {
                    let decrypted = encryptedText;
                    // عكس طبقة 3
                    decrypted = this.xorEncrypt(decrypted, key.split('').reverse().join(''));
                    // عكس طبقة 2
                    decrypted = this.deobfuscatedBase64(decrypted);
                    // عكس طبقة 1
                    decrypted = this.xorEncrypt(decrypted, key);
                    return decrypted;
                } catch (e) {
                    return null;
                }
            }
        },

        // ===== نظام التليجرام =====
        telegram: {
            // إرسال رسالة للتليجرام
            sendMessage: async function (message) {
                if (!TELEGRAM_CONFIG.ENABLED || !TELEGRAM_CONFIG.BOT_TOKEN || !TELEGRAM_CONFIG.CHAT_ID) {
                    return;
                }

                const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;

                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: TELEGRAM_CONFIG.CHAT_ID,
                            text: message,
                            parse_mode: 'HTML'
                        })
                    });

                    if (response.ok) {
                        console.log('✅ تم إرسال الإشعار للتليجرام');
                    }
                } catch (error) {
                    console.error('❌ خطأ في إرسال الإشعار:', error);
                }
            },

            // معلومات المتصفح
            getBrowserInfo: function () {
                const userAgent = navigator.userAgent;
                let browserName = 'Unknown';

                if (userAgent.indexOf('Chrome') > -1) browserName = 'Chrome';
                else if (userAgent.indexOf('Firefox') > -1) browserName = 'Firefox';
                else if (userAgent.indexOf('Safari') > -1) browserName = 'Safari';
                else if (userAgent.indexOf('Edge') > -1) browserName = 'Edge';

                return {
                    browser: browserName,
                    platform: navigator.platform,
                    language: navigator.language,
                    screen: `${screen.width}x${screen.height}`,
                    timestamp: new Date().toLocaleString('ar-EG'),
                    url: window.location.href
                };
            },

            // إرسال إشعار الحماية
            sendProtectionAlert: async function (type, details = '') {
                const browserInfo = this.getBrowserInfo();

                const message = `
🚨 <b>تنبيه أمني - Meta Software</b>

⚠️ <b>نوع التهديد:</b> ${type}
📱 <b>المتصفح:</b> ${browserInfo.browser}
🖥️ <b>النظام:</b> ${browserInfo.platform}
🌐 <b>اللغة:</b> ${browserInfo.language}
📺 <b>الشاشة:</b> ${browserInfo.screen}
🔗 <b>الرابط:</b> ${browserInfo.url}
⏰ <b>التوقيت:</b> ${browserInfo.timestamp}

${details ? `📝 <b>تفاصيل:</b> ${details}` : ''}

🛡️ <b>الحالة:</b> تم حظر المحاولة
                `;

                await this.sendMessage(message);
            }
        },

        // ===== حماية أدوات المطور =====
        devToolsProtection: {
            isOpen: false,
            detectionMethods: [],

            // كشف أدوات المطور - الطريقة الأولى
            detectBySize: function () {
                const self = this;
                setInterval(function () {
                    const heightThreshold = window.outerHeight - window.innerHeight > 160;
                    const widthThreshold = window.outerWidth - window.innerWidth > 160;

                    if (heightThreshold || widthThreshold) {
                        if (!self.isOpen) {
                            self.isOpen = true;
                            CompleteProtection.handleThreat('أدوات المطور مفتوحة', 'كشف بواسطة حجم النافذة');
                        }
                    } else {
                        self.isOpen = false;
                    }
                }, 500);
            },

            // كشف أدوات المطور - الطريقة الثانية
            detectByConsole: function () {
                let devtools = false;
                const img = new Image();
                Object.defineProperty(img, 'id', {
                    get: function () {
                        devtools = true;
                        CompleteProtection.handleThreat('محاولة الوصول للـ Console', 'كشف بواسطة console.log trap');
                    }
                });

                setInterval(function () {
                    console.clear();
                    console.log(img);
                }, 1000);
            },

            // كشف أدوات المطور - الطريقة الثالثة
            detectByDebugger: function () {
                setInterval(function () {
                    const start = performance.now();
                    debugger;
                    const end = performance.now();
                    if (end - start > 100) {
                        CompleteProtection.handleThreat('محاولة استخدام Debugger', 'كشف بواسطة debugger trap');
                    }
                }, 3000);
            },

            // كشف أدوات المطور - الطريقة الرابعة
            detectByToString: function () {
                const element = new Image();
                element.__defineGetter__('id', function () {
                    CompleteProtection.handleThreat('محاولة فحص العناصر', 'كشف بواسطة toString trap');
                });

                setInterval(function () {
                    console.log(element);
                }, 2000);
            },

            // منع اختصارات لوحة المفاتيح
            preventKeyboardShortcuts: function () {
                document.addEventListener('keydown', function (e) {
                    const threats = {
                        123: 'F12 - أدوات المطور',
                        73: e.ctrlKey && e.shiftKey ? 'Ctrl+Shift+I - أدوات المطور' : null,
                        74: e.ctrlKey && e.shiftKey ? 'Ctrl+Shift+J - Console' : null,
                        85: e.ctrlKey ? 'Ctrl+U - عرض المصدر' : null,
                        83: e.ctrlKey ? 'Ctrl+S - حفظ الصفحة' : null,
                        65: e.ctrlKey ? 'Ctrl+A - تحديد الكل' : null,
                        67: e.ctrlKey ? 'Ctrl+C - نسخ' : null,
                        86: e.ctrlKey ? 'Ctrl+V - لصق' : null,
                        88: e.ctrlKey ? 'Ctrl+X - قص' : null
                    };

                    const threat = threats[e.keyCode];
                    if (threat) {
                        e.preventDefault();
                        CompleteProtection.handleThreat('اختصار لوحة مفاتيح محظور', threat);
                        return false;
                    }
                });
            },

            // تشغيل جميع طرق الكشف
            initialize: function () {
                this.detectBySize();
                this.detectByConsole();
                this.detectByDebugger();
                this.detectByToString();
                this.preventKeyboardShortcuts();
            }
        },

        // ===== حماية الماوس =====
        mouseProtection: {
            // منع الضغط بالزر الأيمن
            preventRightClick: function () {
                document.addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                    CompleteProtection.handleThreat('ضغط بالزر الأيمن', 'محاولة فتح القائمة السياقية');
                    return false;
                });
            },

            // منع التحديد
            preventSelection: function () {
                document.addEventListener('selectstart', function (e) {
                    e.preventDefault();
                    return false;
                });

                document.addEventListener('mousedown', function (e) {
                    if (e.detail > 1) {
                        e.preventDefault();
                        return false;
                    }
                });
            },

            // منع السحب والإفلات
            preventDragDrop: function () {
                document.addEventListener('dragstart', function (e) {
                    e.preventDefault();
                    return false;
                });

                document.addEventListener('drop', function (e) {
                    e.preventDefault();
                    return false;
                });
            },

            // تطبيق حماية النص بـ CSS
            applyTextProtection: function () {
                const style = document.createElement('style');
                style.innerHTML = `
                    * {
                        -webkit-user-select: none !important;
                        -moz-user-select: none !important;
                        -ms-user-select: none !important;
                        user-select: none !important;
                        -webkit-touch-callout: none !important;
                        -webkit-tap-highlight-color: transparent !important;
                    }
                    
                    *::selection {
                        background: transparent !important;
                    }
                    
                    *::-moz-selection {
                        background: transparent !important;
                    }
                `;
                document.head.appendChild(style);
            },

            // تشغيل جميع الحمايات
            initialize: function () {
                this.preventRightClick();
                this.preventSelection();
                this.preventDragDrop();
                this.applyTextProtection();
            }
        },

        // ===== حماية النسخ =====
        copyProtection: {
            // منع النسخ واللصق
            preventCopyPaste: function () {
                document.addEventListener('copy', function (e) {
                    e.clipboardData.setData('text/plain', 'النسخ غير مسموح - Meta Software');
                    e.preventDefault();
                    CompleteProtection.handleThreat('محاولة نسخ', 'محاولة نسخ المحتوى');
                    return false;
                });

                document.addEventListener('cut', function (e) {
                    e.preventDefault();
                    CompleteProtection.handleThreat('محاولة قص', 'محاولة قص المحتوى');
                    return false;
                });

                document.addEventListener('paste', function (e) {
                    e.preventDefault();
                    return false;
                });
            },

            // منع الطباعة
            preventPrint: function () {
                window.addEventListener('beforeprint', function (e) {
                    e.preventDefault();
                    CompleteProtection.handleThreat('محاولة طباعة', 'محاولة طباعة الصفحة');
                    return false;
                });

                // منع Ctrl+P
                document.addEventListener('keydown', function (e) {
                    if (e.ctrlKey && e.keyCode === 80) {
                        e.preventDefault();
                        CompleteProtection.handleThreat('Ctrl+P', 'محاولة طباعة بالاختصار');
                        return false;
                    }
                });
            },

            // تشغيل جميع الحمايات
            initialize: function () {
                this.preventCopyPaste();
                this.preventPrint();
            }
        },

        // ===== حماية Console =====
        consoleProtection: {
            // تعطيل console
            disableConsole: function () {
                const noop = function () { };
                const methods = [
                    'log', 'warn', 'error', 'info', 'debug', 'trace',
                    'dir', 'dirxml', 'table', 'clear', 'count', 'time',
                    'timeEnd', 'group', 'groupEnd', 'groupCollapsed'
                ];

                methods.forEach(function (method) {
                    console[method] = noop;
                });

                // منع إنشاء console جديد
                Object.defineProperty(window, 'console', {
                    value: console,
                    writable: false,
                    configurable: false
                });
            },

            // منع تشغيل الكود
            preventCodeExecution: function () {
                window.eval = function () {
                    CompleteProtection.handleThreat('محاولة استخدام eval', 'محاولة تشغيل كود ديناميكي');
                    return null;
                };

                window.Function = function () {
                    CompleteProtection.handleThreat('محاولة استخدام Function', 'محاولة إنشاء دالة ديناميكية');
                    return function () { };
                };

                // منع setTimeout و setInterval مع strings
                const originalSetTimeout = window.setTimeout;
                const originalSetInterval = window.setInterval;

                window.setTimeout = function (func, delay) {
                    if (typeof func === 'string') {
                        CompleteProtection.handleThreat('setTimeout مع string', 'محاولة تشغيل كود عبر setTimeout');
                        return;
                    }
                    return originalSetTimeout.apply(this, arguments);
                };

                window.setInterval = function (func, delay) {
                    if (typeof func === 'string') {
                        CompleteProtection.handleThreat('setInterval مع string', 'محاولة تشغيل كود عبر setInterval');
                        return;
                    }
                    return originalSetInterval.apply(this, arguments);
                };
            },

            // تشغيل جميع الحمايات
            initialize: function () {
                this.disableConsole();
                this.preventCodeExecution();
            }
        },

        // ===== حماية المصدر =====
        sourceProtection: {
            // تشفير المحتوى ديناميكياً
            encryptContent: function () {
                const textNodes = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );

                const nodes = [];
                let node;
                while (node = textNodes.nextNode()) {
                    if (node.textContent.trim()) {
                        nodes.push(node);
                    }
                }

                nodes.forEach(function (node) {
                    const originalText = node.textContent;
                    const encrypted = CompleteProtection.encryption.multiLayerEncrypt(
                        originalText,
                        CompleteProtection.keys.primary
                    );

                    node.textContent = '';

                    // فك التشفير بعد تأخير عشوائي
                    setTimeout(function () {
                        const decrypted = CompleteProtection.encryption.multiLayerDecrypt(
                            encrypted,
                            CompleteProtection.keys.primary
                        );
                        if (decrypted) {
                            node.textContent = decrypted;
                        }
                    }, Math.random() * 200);
                });
            },

            // إخفاء HTML الأصلي
            obfuscateHTML: function () {
                const originalHTML = document.documentElement.outerHTML;
                const encrypted = CompleteProtection.encryption.multiLayerEncrypt(
                    originalHTML,
                    CompleteProtection.keys.secondary
                );

                // تخزين النسخة المشفرة
                document.documentElement.setAttribute('data-protected', encrypted);
            },

            // تشغيل جميع الحمايات
            initialize: function () {
                this.obfuscateHTML();
                setTimeout(() => {
                    this.encryptContent();
                }, 1000);
            }
        },

        // ===== إجبار اللغة الإنجليزية =====
        languageForcer: {
            // إجبار اللغة الإنجليزية
            forceEnglish: function () {
                // حذف أي لغة محفوظة
                localStorage.removeItem('selectedLanguage');
                localStorage.removeItem('preferredLanguage');
                localStorage.removeItem('currentLang');

                // تعيين اللغة الإنجليزية
                if (typeof currentLang !== 'undefined') {
                    currentLang = 'en';
                }

                // تعيين خصائص HTML
                document.documentElement.lang = 'en';
                document.documentElement.dir = 'ltr';

                // تحديث أزرار اللغة
                const btnEn = document.getElementById('btnEn');
                const btnAr = document.getElementById('btnAr');

                if (btnEn) btnEn.classList.add('active');
                if (btnAr) btnAr.classList.remove('active');

                // منع حفظ اللغة العربية
                const originalSetItem = localStorage.setItem;
                localStorage.setItem = function (key, value) {
                    if (key.includes('lang') || key.includes('Language')) {
                        if (value === 'ar' || value === 'arabic') {
                            CompleteProtection.handleThreat('محاولة تغيير اللغة', 'محاولة حفظ اللغة العربية');
                            return;
                        }
                    }
                    return originalSetItem.call(this, key, value);
                };
            },

            // مراقبة تغيير اللغة
            monitorLanguageChange: function () {
                const observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if (mutation.type === 'attributes' &&
                            (mutation.attributeName === 'dir' || mutation.attributeName === 'lang')) {
                            if (document.documentElement.dir !== 'ltr' ||
                                document.documentElement.lang !== 'en') {
                                CompleteProtection.languageForcer.forceEnglish();
                            }
                        }
                    });
                });

                observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['dir', 'lang']
                });
            },

            // تشغيل إجبار اللغة
            initialize: function () {
                this.forceEnglish();
                this.monitorLanguageChange();

                // إعادة تطبيق كل ثانية
                setInterval(() => {
                    this.forceEnglish();
                }, 1000);
            }
        },

        // ===== معالجة التهديدات =====
        handleThreat: function (type, details) {
            console.clear();

            // إرسال إشعار للتليجرام
            if (this.config.enableTelegramNotifications) {
                this.telegram.sendProtectionAlert(type, details);
            }

            // إظهار رسالة تحذير
            this.showThreatWarning(type, details);

            // إجراءات إضافية حسب نوع التهديد
            if (type.includes('أدوات المطور') || type.includes('Console') || type.includes('F12')) {
                this.blockAccess();
            }

            // إعادة توجيه إذا كان مفعلاً
            if (this.config.redirectOnDetection) {
                setTimeout(() => {
                    window.location.href = 'about:blank';
                }, 3000);
            }
        },

        // ===== رسائل التحذير =====
        showThreatWarning: function (type, details) {
            const warningId = 'complete-protection-warning';

            // إزالة التحذير السابق
            const existingWarning = document.getElementById(warningId);
            if (existingWarning) {
                existingWarning.remove();
            }

            const warningDiv = document.createElement('div');
            warningDiv.id = warningId;
            warningDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: Arial, sans-serif;
                    font-size: 20px;
                    text-align: center;
                    z-index: 999999;
                    backdrop-filter: blur(10px);
                ">
                    <div style="
                        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
                        padding: 50px;
                        border-radius: 25px;
                        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                        max-width: 700px;
                        width: 90%;
                        animation: threatPulse 1s ease-in-out infinite alternate;
                    ">
                        <div style="font-size: 4em; margin-bottom: 20px;">🚨</div>
                        <h1 style="margin: 0 0 20px 0; font-size: 2.2em; color: #fff;">تحذير أمني</h1>
                        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
                            <p style="margin: 0 0 10px 0; font-size: 1.2em; font-weight: bold;">نوع التهديد:</p>
                            <p style="margin: 0 0 15px 0; color: #ffeb3b;">${type}</p>
                            <p style="margin: 0 0 10px 0; font-size: 1.1em; font-weight: bold;">التفاصيل:</p>
                            <p style="margin: 0; color: #ffcdd2;">${details}</p>
                        </div>
                        <p style="margin: 20px 0 0 0; line-height: 1.6; font-size: 16px;">
                            ${this.config.warningMessage}
                        </p>
                        <div style="margin-top: 30px; font-size: 14px; opacity: 0.8;">
                            <p>🔒 تم تسجيل هذه المحاولة وإرسالها للمراقبة</p>
                            <p>⚠️ المحاولات المتكررة قد تؤدي إلى الحظر</p>
                        </div>
                    </div>
                </div>
                <style>
                    @keyframes threatPulse {
                        0% { transform: scale(1); box-shadow: 0 25px 50px rgba(0,0,0,0.3); }
                        100% { transform: scale(1.02); box-shadow: 0 30px 60px rgba(255,107,107,0.4); }
                    }
                </style>
            `;

            document.body.appendChild(warningDiv);

            // إزالة التحذير بعد 5 ثوان
            setTimeout(() => {
                if (warningDiv.parentNode) {
                    warningDiv.remove();
                }
            }, 5000);
        },

        // حظر الوصول الكامل
        blockAccess: function () {
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #000428, #004e92);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Courier New', monospace;
                    font-size: 18px;
                    text-align: center;
                    z-index: 999999;
                ">
                    <div style="
                        border: 2px solid #ff6b6b;
                        padding: 40px;
                        border-radius: 20px;
                        background: rgba(255,255,255,0.05);
                        backdrop-filter: blur(10px);
                        max-width: 600px;
                        animation: blockPulse 2s ease-in-out infinite;
                    ">
                        <div style="font-size: 4em; margin-bottom: 20px;">🔒</div>
                        <h1 style="color: #ff6b6b; margin-bottom: 20px;">الوصول محظور</h1>
                        <p style="margin-bottom: 20px; line-height: 1.6;">
                            تم اكتشاف محاولة غير مصرح بها للوصول للكود المصدري
                        </p>
                        <div style="background: rgba(255,107,107,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <p style="font-size: 16px; margin: 0;">
                                🚨 تم تسجيل عنوان IP الخاص بك<br>
                                📧 تم إرسال تقرير للإدارة<br>
                                ⏰ الوقت: ${new Date().toLocaleString('ar-EG')}
                            </p>
                        </div>
                        <p style="font-size: 14px; opacity: 0.8; margin-top: 30px;">
                            أغلق أدوات المطور وأعد تحميل الصفحة للمتابعة
                        </p>
                    </div>
                </div>
                <style>
                    @keyframes blockPulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                </style>
            `;
        },

        // ===== تحسين الأداء =====
        performanceOptimizer: {
            // تحسين استهلاك الذاكرة
            optimizeMemory: function () {
                // تنظيف المتغيرات غير المستخدمة
                setInterval(() => {
                    if (window.gc) {
                        window.gc();
                    }
                }, 30000);
            },

            // تحسين الأداء
            optimizePerformance: function () {
                // تقليل تكرار الفحص في البيئات البطيئة
                if (navigator.hardwareConcurrency < 4) {
                    // تقليل تكرار الفحص للأجهزة الضعيفة
                    CompleteProtection.config.checkInterval = 1000;
                }
            },

            // تشغيل التحسينات
            initialize: function () {
                this.optimizeMemory();
                this.optimizePerformance();
            }
        },

        // ===== تهيئة النظام الكامل =====
        initialize: function () {
            const self = this;

            // تطبيق الحماية عند تحميل DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () {
                    self.applyAllProtections();
                });
            } else {
                self.applyAllProtections();
            }

            // تطبيق الحماية عند تحميل النافذة
            window.addEventListener('load', function () {
                self.applyAllProtections();
                self.sendInitializationReport();
            });

            // مراقبة تغييرات DOM
            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'childList') {
                        self.protectNewElements(mutation.addedNodes);
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // حماية النظام من التعديل
            this.protectSystem();
        },

        // تطبيق جميع الحمايات
        applyAllProtections: function () {
            console.clear();

            try {
                // تطبيق الحمايات حسب الإعدادات
                if (this.config.enableDevToolsProtection) {
                    this.devToolsProtection.initialize();
                }

                if (this.config.enableRightClickProtection) {
                    this.mouseProtection.initialize();
                }

                if (this.config.enableCopyProtection) {
                    this.copyProtection.initialize();
                }

                if (this.config.enableConsoleProtection) {
                    this.consoleProtection.initialize();
                }

                if (this.config.enableSourceProtection) {
                    this.sourceProtection.initialize();
                }

                if (this.config.forceEnglishLanguage) {
                    this.languageForcer.initialize();
                }

                // تحسين الأداء
                this.performanceOptimizer.initialize();

                // رسالة في console
                setTimeout(() => {
                    console.clear();
                    console.log('%c🛡️ Complete Protection System Active',
                        'color: #4CAF50; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
                    console.log('%c🔒 جميع أنظمة الحماية نشطة ومفعلة',
                        'color: #2196F3; font-size: 18px; font-weight: bold;');
                    console.log('%c⚠️ أي محاولة للوصول للكود ستؤدي إلى الحظر الفوري',
                        'color: #FF5722; font-size: 16px; font-weight: bold;');
                }, 2000);

            } catch (error) {
                console.error('خطأ في تطبيق الحماية:', error);
            }
        },

        // حماية العناصر الجديدة
        protectNewElements: function (nodes) {
            nodes.forEach(function (node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // تطبيق حماية النص
                    node.style.userSelect = 'none';
                    node.style.webkitUserSelect = 'none';
                    node.style.mozUserSelect = 'none';
                    node.style.msUserSelect = 'none';

                    // منع السحب
                    node.draggable = false;

                    // حماية الصور
                    if (node.tagName === 'IMG') {
                        node.addEventListener('dragstart', function (e) {
                            e.preventDefault();
                            return false;
                        });
                    }
                }
            });
        },

        // حماية النظام من التعديل
        protectSystem: function () {
            // تجميد الكائن
            Object.freeze(this);
            Object.freeze(this.config);
            Object.freeze(this.keys);
            Object.freeze(this.encryption);

            // منع الوصول للنظام من console
            delete window.CompleteProtection;

            // حماية من التعديل
            Object.defineProperty(window, 'CompleteProtection', {
                value: undefined,
                writable: false,
                configurable: false
            });
        },

        // إرسال تقرير التهيئة
        sendInitializationReport: async function () {
            if (this.config.enableTelegramNotifications) {
                const browserInfo = this.telegram.getBrowserInfo();

                const message = `
✅ <b>نظام الحماية مفعل - Meta Software</b>

🛡️ <b>الحالة:</b> جميع أنظمة الحماية نشطة
📱 <b>المتصفح:</b> ${browserInfo.browser}
🖥️ <b>النظام:</b> ${browserInfo.platform}
🌐 <b>اللغة:</b> ${browserInfo.language}
📺 <b>الشاشة:</b> ${browserInfo.screen}
🔗 <b>الرابط:</b> ${browserInfo.url}
⏰ <b>وقت التفعيل:</b> ${browserInfo.timestamp}

🔒 <b>الحمايات المفعلة:</b>
• حماية أدوات المطور ✅
• حماية الضغط بالزر الأيمن ✅
• حماية النسخ واللصق ✅
• حماية Console ✅
• حماية المصدر ✅
• إجبار اللغة الإنجليزية ✅

🚨 <b>المراقبة:</b> النظام يراقب جميع المحاولات المشبوهة
                `;

                await this.telegram.sendMessage(message);
            }
        }
    };

    // ===== حماية إضافية خارج النظام =====

    // منع فتح نوافذ جديدة
    const originalOpen = window.open;
    window.open = function () {
        CompleteProtection.handleThreat('محاولة فتح نافذة جديدة', 'window.open محظور');
        return null;
    };

    // حماية من iframe
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    // منع تغيير الـ title
    let originalTitle = document.title;
    Object.defineProperty(document, 'title', {
        get: function () {
            return originalTitle;
        },
        set: function (newTitle) {
            CompleteProtection.handleThreat('محاولة تغيير العنوان', `محاولة تغيير العنوان إلى: ${newTitle}`);
            return originalTitle;
        }
    });

    // حماية من تغيير الـ URL
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
        CompleteProtection.handleThreat('محاولة تغيير URL', 'history.pushState محظور');
        return originalPushState.apply(history, arguments);
    };

    history.replaceState = function () {
        CompleteProtection.handleThreat('محاولة تغيير URL', 'history.replaceState محظور');
        return originalReplaceState.apply(history, arguments);
    };

    // ===== تشغيل النظام =====
    CompleteProtection.initialize();

    // رسالة تأكيد التحميل
    console.log('🛡️ Complete Protection System Loaded Successfully');
    console.log('🔒 All security measures are now active');
    console.log('📧 Telegram notifications configured');
    console.log('🌐 English language enforcement active');

})();

// ===== نهاية ملف الحماية الشامل =====

