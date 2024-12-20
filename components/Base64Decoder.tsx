'use client';

// components/Base64Decoder.tsx
import React, { useState } from 'react';

interface Base64DecoderProps {
    base64String: string;
}

const Base64Decoder: React.FC<Base64DecoderProps> = ({ base64String }) => {
    const [decodedText, setDecodedText] = useState<string>('');

    const decodeBase64 = () => {
        try {
            // Remove any whitespace and newlines
            const cleanStr = base64String.replace(/[\s\n\\n]/g, '');

            // Convert base64 to text
            const decoded = Buffer.from(cleanStr, 'base64').toString('utf-8');
            setDecodedText(decoded);
        } catch (error) {
            setDecodedText('Error decoding base64 string');
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={decodeBase64}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Decode
            </button>

            {decodedText && (
                <div className="mt-4">
          <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-[500px] whitespace-pre-wrap">
            {decodedText}
          </pre>
                </div>
            )}
        </div>
    );
};

export default Base64Decoder;