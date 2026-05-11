// ── DoE PNG AI Chatbot Widget ──────────────────────────────────
(function () {
    'use strict';

    const BOT_NAME    = 'EduBot';
    const BOT_TAGLINE = 'DoE PNG Assistant';
    const API_URL     = 'api/chatbot.php';

    const QUICK_REPLIES = [
        'What is the TFF policy?',
        'School term dates 2026',
        'How to contact DoE?',
        'Teacher recruitment info',
        'Download curriculum',
    ];

    let chatHistory = [];
    let isOpen      = false;
    let isTyping    = false;

    // ── Inject CSS ─────────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        /* Chatbot Bubble */
        #doe-chat-bubble {
            position: fixed;
            bottom: 100px;
            right: 28px;
            width: 66px;
            height: 66px;
            background: transparent;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 99999;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #doe-chat-bubble:hover {
            transform: scale(1.1);
        }
        #doe-chat-bubble svg, #doe-chat-bubble img { width: 100%; height: 100%; filter: drop-shadow(0 8px 24px rgba(0,0,0,0.2)); }

        /* Unread badge */
        #doe-chat-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #ef4444;
            color: #fff;
            font-size: 0.7rem;
            font-weight: 800;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #0a0d14;
            animation: pulse-badge 2s infinite;
        }
        @keyframes pulse-badge {
            0%, 100% { transform: scale(1); }
            50%       { transform: scale(1.15); }
        }

        /* Chat Window */
        #doe-chat-window {
            position: fixed;
            bottom: 170px;
            right: 28px;
            width: 370px;
            max-width: calc(100vw - 40px);
            height: 520px;
            max-height: calc(100vh - 120px);
            background: rgba(10, 15, 28, 0.97);
            border: 1px solid rgba(59,165,224,0.25);
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            z-index: 99998;
            box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,165,224,0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            pointer-events: none;
            transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #doe-chat-window.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
        }

        /* Header */
        #doe-chat-header {
            background: linear-gradient(135deg, rgba(14,32,64,0.98), rgba(10,15,28,0.98));
            border-bottom: 1px solid rgba(59,165,224,0.2);
            padding: 1rem 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.9rem;
            flex-shrink: 0;
        }
        .doe-chat-avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .doe-chat-avatar svg, .doe-chat-avatar img { width: 26px; height: 26px; fill: #fff; }
        .doe-chat-header-info { flex: 1; }
        .doe-chat-header-info strong {
            display: block;
            color: #fff;
            font-size: 0.95rem;
            font-weight: 700;
        }
        .doe-chat-status {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.75rem;
            color: #4ade80;
            font-weight: 500;
        }
        .doe-chat-status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #4ade80;
            animation: pulse-status 2s infinite;
        }
        @keyframes pulse-status {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.4; }
        }
        #doe-chat-close {
            background: rgba(255,255,255,0.07);
            border: none;
            color: rgba(255,255,255,0.6);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        #doe-chat-close:hover { background: rgba(255,255,255,0.15); color: #fff; }

        /* Messages */
        #doe-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 1.2rem;
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
            scroll-behavior: smooth;
        }
        #doe-chat-messages::-webkit-scrollbar { width: 4px; }
        #doe-chat-messages::-webkit-scrollbar-track { background: transparent; }
        #doe-chat-messages::-webkit-scrollbar-thumb { background: rgba(59,165,224,0.3); border-radius: 4px; }

        .doe-msg {
            display: flex;
            gap: 0.6rem;
            align-items: flex-end;
            animation: msg-in 0.3s ease;
        }
        @keyframes msg-in {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .doe-msg.user { flex-direction: row-reverse; }

        .doe-msg-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 0.7rem;
        }
        .doe-msg.bot .doe-msg-avatar { background: transparent; }
        .doe-msg.user .doe-msg-avatar { background: #1e3a8a; }
        .doe-msg-avatar svg, .doe-msg-avatar img { width: 22px; height: 22px; fill: #fff; }

        .doe-msg-bubble {
            max-width: 80%;
            padding: 0.75rem 1rem;
            border-radius: 18px;
            font-size: 0.88rem;
            line-height: 1.55;
            word-wrap: break-word;
        }
        .doe-msg.bot .doe-msg-bubble {
            background: rgba(59,165,224,0.1);
            border: 1px solid rgba(59,165,224,0.2);
            color: #e0eeff;
            border-bottom-left-radius: 4px;
        }
        .doe-msg.user .doe-msg-bubble {
            background: linear-gradient(135deg, rgba(59,165,224,0.8), rgba(59,165,224,0.6));
            color: #fff;
            border-bottom-right-radius: 4px;
        }

        /* Typing indicator */
        .doe-typing-dots {
            display: flex;
            gap: 4px;
            padding: 4px 0;
        }
        .doe-typing-dots span {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(59,165,224,0.7);
            animation: typing-dot 1.2s infinite;
        }
        .doe-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .doe-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-dot {
            0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
            40%            { transform: scale(1);   opacity: 1; }
        }

        /* Quick replies */
        #doe-quick-replies {
            padding: 0.5rem 1rem 0.75rem;
            display: flex;
            gap: 0.4rem;
            flex-wrap: wrap;
            flex-shrink: 0;
            border-top: 1px solid rgba(59,165,224,0.1);
        }
        .doe-quick-btn {
            background: rgba(59,165,224,0.08);
            border: 1px solid rgba(59,165,224,0.25);
            color: #3ba5e0;
            padding: 0.3rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
            white-space: nowrap;
        }
        .doe-quick-btn:hover {
            background: rgba(59,165,224,0.2);
            border-color: #3ba5e0;
            color: #fff;
        }

        /* Input Area */
        #doe-chat-input-row {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.85rem 1rem;
            border-top: 1px solid rgba(59,165,224,0.15);
            background: rgba(14,32,64,0.5);
            flex-shrink: 0;
        }
        #doe-chat-input {
            flex: 1;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(59,165,224,0.2);
            border-radius: 14px;
            padding: 0.65rem 1rem;
            color: #fff;
            font-size: 0.88rem;
            font-family: inherit;
            outline: none;
            resize: none;
            line-height: 1.4;
            max-height: 100px;
            overflow-y: auto;
            transition: border-color 0.2s;
        }
        #doe-chat-input:focus { border-color: rgba(59,165,224,0.6); }
        #doe-chat-input::placeholder { color: rgba(255,255,255,0.3); }
        #doe-chat-send {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3ba5e0, #2a8fc4);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            flex-shrink: 0;
            transition: all 0.2s;
            box-shadow: 0 4px 16px rgba(59,165,224,0.3);
        }
        #doe-chat-send:hover  { transform: scale(1.1); box-shadow: 0 6px 20px rgba(59,165,224,0.5); }
        #doe-chat-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        #doe-chat-send svg { width: 18px; height: 18px; fill: #fff; }

        @media (max-width: 480px) {
            #doe-chat-window { right: 12px; left: 12px; width: auto; bottom: 150px; }
            #doe-chat-bubble { bottom: 80px; right: 16px; }
        }
    `;
    document.head.appendChild(style);

    // ── Build HTML ─────────────────────────────────────────────
    const botIconSVG = `<img src="/assets/images/edubot-icon/edubot-bubble-icon.svg" alt="EduBot" style="width:100%;height:100%;object-fit:contain;">`;
    const sendIconSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
    const userIconSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>`;

    const bubbleEl = document.createElement('div');
    bubbleEl.id = 'doe-chat-bubble';
    bubbleEl.title = 'Chat with EduBot';
    bubbleEl.innerHTML = `${botIconSVG}<div id="doe-chat-badge">1</div>`;

    const windowEl = document.createElement('div');
    windowEl.id = 'doe-chat-window';
    windowEl.setAttribute('aria-live', 'polite');
    windowEl.innerHTML = `
        <div id="doe-chat-header">
            <div class="doe-chat-avatar">${botIconSVG}</div>
            <div class="doe-chat-header-info">
                <strong>${BOT_NAME}</strong>
                <div class="doe-chat-status"><span class="doe-chat-status-dot"></span>Online — ${BOT_TAGLINE}</div>
            </div>
            <button id="doe-chat-close" aria-label="Close chat">✕</button>
        </div>
        <div id="doe-chat-messages"></div>
        <div id="doe-quick-replies"></div>
        <div id="doe-chat-input-row">
            <textarea id="doe-chat-input" placeholder="Ask EduBot a question..." rows="1" aria-label="Chat message"></textarea>
            <button id="doe-chat-send" aria-label="Send message">${sendIconSVG}</button>
        </div>
    `;

    document.body.appendChild(windowEl);
    document.body.appendChild(bubbleEl);

    // ── Elements ───────────────────────────────────────────────
    const messagesEl    = document.getElementById('doe-chat-messages');
    const inputEl       = document.getElementById('doe-chat-input');
    const sendBtn       = document.getElementById('doe-chat-send');
    const closeBtn      = document.getElementById('doe-chat-close');
    const quickEl       = document.getElementById('doe-quick-replies');
    const badgeEl       = document.getElementById('doe-chat-badge');

    // ── Quick Replies ──────────────────────────────────────────
    QUICK_REPLIES.forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'doe-quick-btn';
        btn.textContent = text;
        btn.addEventListener('click', () => { sendMessage(text); quickEl.style.display = 'none'; });
        quickEl.appendChild(btn);
    });

    // ── Toggle Window ──────────────────────────────────────────
    function openChat() {
        isOpen = true;
        windowEl.classList.add('open');
        badgeEl.style.display = 'none';
        if (messagesEl.children.length === 0) addBotGreeting();
        setTimeout(() => inputEl.focus(), 350);
    }

    function closeChat() {
        isOpen = false;
        windowEl.classList.remove('open');
    }

    bubbleEl.addEventListener('click', () => isOpen ? closeChat() : openChat());
    closeBtn.addEventListener('click', closeChat);

    // ── Greeting ───────────────────────────────────────────────
    async function addBotGreeting() {
        const greetingParts = [
            'Hi! 👋 I\'m <strong>EduBot</strong>, your official assistant for the Department of Education Papua New Guinea.',
            'I can help you with:\n• School programs & services\n• Term dates & calendars\n• Teacher recruitment\n• Publications & documents\n• Forms & official certificates',
            'What would you like to know? 😊'
        ];

        for (let i = 0; i < greetingParts.length; i++) {
            if (i > 0) {
                await new Promise(resolve => {
                    showTyping();
                    setTimeout(() => { hideTyping(); resolve(); }, 700);
                });
            }
            addMessage('bot', greetingParts[i]);
            if (i < greetingParts.length - 1) {
                await new Promise(r => setTimeout(r, 200));
            }
        }
    }

    // ── Add Message ────────────────────────────────────────────
    function formatBotText(text) {
        // Convert URLs to clickable links
        let formatted = text.replace(
            /(https?:\/\/[^\s<>"']+)/g,
            '<a href="$1" target="_blank" rel="noopener" style="color:#3ba5e0;text-decoration:underline;word-break:break-all;">$1</a>'
        );
        // Convert email addresses to clickable mailto links
        formatted = formatted.replace(
            /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,
            '<a href="mailto:$1" style="color:#f5a623;text-decoration:underline;font-weight:600;">$1</a>'
        );
        // Convert newlines to <br>
        return formatted.replace(/\n/g, '<br>');
    }

    function addMessage(role, text) {
        const msg = document.createElement('div');
        msg.className = `doe-msg ${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'doe-msg-avatar';
        avatar.innerHTML = role === 'bot' ? botIconSVG : userIconSVG;

        const bubble = document.createElement('div');
        bubble.className = 'doe-msg-bubble';
        bubble.innerHTML = role === 'bot' ? formatBotText(text) : text.replace(/\n/g, '<br>');

        msg.appendChild(avatar);
        msg.appendChild(bubble);
        messagesEl.appendChild(msg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return msg;
    }

    // ── Typing Indicator ───────────────────────────────────────
    function showTyping() {
        const msg = document.createElement('div');
        msg.className = 'doe-msg bot';
        msg.id = 'doe-typing-msg';

        const avatar = document.createElement('div');
        avatar.className = 'doe-chat-avatar';
        avatar.style.cssText = 'width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#3ba5e0,#f5a623);display:flex;align-items:center;justify-content:center;flex-shrink:0;';
        avatar.innerHTML = botIconSVG;

        const bubble = document.createElement('div');
        bubble.className = 'doe-msg-bubble bot';
        bubble.innerHTML = '<div class="doe-typing-dots"><span></span><span></span><span></span></div>';

        msg.appendChild(avatar);
        msg.appendChild(bubble);
        messagesEl.appendChild(msg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
        const t = document.getElementById('doe-typing-msg');
        if (t) t.remove();
    }

    // ── Send Message ───────────────────────────────────────────
    async function sendMessage(text) {
        text = (text || inputEl.value).trim();
        if (!text || isTyping) return;

        inputEl.value = '';
        inputEl.style.height = 'auto';
        quickEl.style.display = 'none';

        addMessage('user', text);
        chatHistory.push({ role: 'user', content: text });

        isTyping = true;
        sendBtn.disabled = true;
        showTyping();

        try {
            const res = await fetch(API_URL, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ message: text, history: chatHistory.slice(-20) }),
            });

            const data = await res.json();
            hideTyping();

            if (data.error) {
                addMessage('bot', '⚠️ ' + data.error);
                return;
            }

            const reply = data.reply || 'Sorry, I could not process your request. Please try again.';
            chatHistory.push({ role: 'assistant', content: reply });

            // ── Split reply into separate bubbles by blank lines ──
            const chunks = reply
                .split(/\n\s*\n/)                  // split on blank lines
                .map(c => c.trim())
                .filter(c => c.length > 0);

            if (chunks.length <= 1) {
                // Single block — show as one bubble
                addMessage('bot', reply);
            } else {
                // Multiple blocks — show each as its own bubble with a typing delay
                for (let i = 0; i < chunks.length; i++) {
                    if (i > 0) {
                        // Show typing dots briefly between bubbles
                        await new Promise(resolve => {
                            showTyping();
                            setTimeout(() => { hideTyping(); resolve(); }, 700);
                        });
                    }
                    addMessage('bot', chunks[i]);
                    // Small pause before showing next bubble
                    if (i < chunks.length - 1) {
                        await new Promise(r => setTimeout(r, 200));
                    }
                }
            }

        } catch (err) {
            hideTyping();
            addMessage('bot', 'I\'m having trouble connecting right now. Please try again in a moment, or contact us directly at <strong>education.gov.pg</strong>.');
        } finally {
            isTyping = false;
            sendBtn.disabled = false;
            inputEl.focus();
        }
    }

    // ── Input Events ───────────────────────────────────────────
    sendBtn.addEventListener('click', () => sendMessage());

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    inputEl.addEventListener('input', () => {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
    });

    // Show badge after 3 seconds to draw attention
    setTimeout(() => {
        if (!isOpen) badgeEl.style.display = 'flex';
    }, 3000);

})();
