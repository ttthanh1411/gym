'use client';
import React from 'react';

import ChatbotWidget from '../../component/ChatbotWidget';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ChatbotWidget />
        </>
    );
} 