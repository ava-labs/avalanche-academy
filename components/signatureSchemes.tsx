"use client";
const bls = require("@noble/bls12-381");
import React, { useState } from 'react';
import {
    CodeBlock, Pre
  } from 'fumadocs-ui/components/codeblock';
import { buttonVariants } from './ui/button';
import { Input } from './ui/input';

const bufferToHex = (buffer: ArrayBufferLike): string => {
    return [...new Uint8Array(buffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
}

const checkSig = async (signature: string, publicKey: string, message: string) => {
    let res = await bls.verify(signature, new TextEncoder().encode(message), publicKey);
    return res
}

export const GenerateKeysButton: React.FC = () => {

    const [privKey, setPrivKey] = useState<string | null>(null);
    const [pubKey, setPubKey] = useState<string | null>(null);
    const generateKeys = () => {
        const privKey = new Uint8Array(32);
        crypto.getRandomValues(privKey);
        const pubKey = bufferToHex(bls.getPublicKey(privKey));
        setPrivKey(bufferToHex(privKey));
        setPubKey(pubKey);
        return { privKey, pubKey };
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div>
            <button className={buttonVariants()} onClick={generateKeys}>
                Generate Keys
            </button>

            {privKey && <CodeBlock title="🗝️ Private Key" lang="bash" allowCopy={true}>
                <Pre>{privKey}</Pre>
            </CodeBlock>}

            {pubKey && <CodeBlock title="🔑 Public Key:" lang="bash" allowCopy={true}>
                <Pre>{pubKey}</Pre>
            </CodeBlock>}
        </div>
    );
}

export const SignMessageButton: React.FC = () => {

    const [privKey, setPrivKey] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);

    const signMessage = async () => {
        if (!privKey || !message) {
            return;
        }
        setSignature(bufferToHex(await bls.sign(new TextEncoder().encode(message), privKey)));
    }

    return (
        <div>
            <p>🗝️Private Key</p>
            <Input id="privatekey" placeholder="Enter private key to sign message with" onChange={(e) => setPrivKey(e.target.value)} />
            <br />
            <p>📝Message</p>
            <Input id="message" placeholder="Enter message to sign" onChange={(e) => setMessage(e.target.value)} />

            <button className={buttonVariants()} onClick={signMessage} disabled={!privKey || !message}>
                Sign Message
            </button>

            {signature && <CodeBlock title="🔏 Signature:" lang="bash" allowCopy={true}>
                <Pre>{signature}</Pre>
            </CodeBlock>}
        </div>
    );
}

export const VerifySignatureButton: React.FC = () => {

    const [pubKey, setPubKey] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const verifySignature = async () => {
        if (signature && pubKey && message) {
            checkSig(signature, pubKey, message).then((res) => {
                console.log(res)
                if (res) {
                    setIsValid(res);
                } else {
                    setIsValid(false);
                }
            });
        }
    };

    return (
        <div>
            <p>🔑Public Key</p>
            <Input id="publickey" placeholder="Enter public key to verify signature" onChange={(e) => setPubKey(e.target.value)} />
            <br />
            <p>📝Message</p>
            <Input id="message" placeholder="Enter message to verify" onChange={(e) => setMessage(e.target.value)} />
            <br />
            <p>🔏Signature</p>
            <Input id="signature" placeholder="Enter signature to verify" onChange={(e) => setSignature(e.target.value)} />

            <button className={buttonVariants()} onClick={verifySignature} disabled={!signature || !pubKey || !message}>
                Verify Signature
            </button>

            {isValid !== null && (
                <p>{isValid ? '✅ Signature is valid!' : '❌ Signature is invalid!'}</p>
            )}
        </div>
    );
}

