"use client";
const bls = require("@noble/bls12-381");
import React, { useState } from 'react';

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
        <div style={{ textAlign: 'center' }}>
            <button
                className="btn btn-primary"
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    margin: '10px'
                }}
                onClick={generateKeys}
            >
                Generate Keys
            </button>

            <div style={{padding: '10px' }}>
                <p>🗝️Private Key: {privKey}</p>
                <button
                    onClick={() => copyToClipboard(privKey ? String(privKey) : '')}
                    style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginRight: '5px' }}
                >
                    Copy Private Key
                </button>
                <p style={{overflowWrap: 'break-word' }}>🔑Public Key: {pubKey}</p>
                <button
                    onClick={() => copyToClipboard(pubKey ? String(pubKey) : '')}
                    style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginRight: '5px' }}
                >
                    Copy Public Key
                </button>
            </div>
        </div>
    );
}

export const SignMessageButton: React.FC = () => {

    const [privKey, setPrivKey] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [showSignature, setShowSignature] = useState(false);

    const signMessage = async () => {
        if (!privKey || !message) {
            return;
        }
        setSignature(bufferToHex(await bls.sign(new TextEncoder().encode(message), privKey)));
        setShowSignature(true);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <p>🗝️Private Key</p>
            <input type="text" id="privatekey" placeholder="Enter private key to sign message with" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setPrivKey(e.target.value)} />
            <br />
            <p>📝Message</p>
            <input type="text" id="message" placeholder="Enter message to sign" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setMessage(e.target.value)} />

            <button
                className="btn btn-primary"
                style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', margin: '10px' }}
                onClick={signMessage}
            >
                Sign Message
            </button>

            {showSignature && (
                <>
                    <p>Signature:</p>
                    <p style={{ overflowWrap: 'break-word' }}>{signature}</p>
                </>
            )}
        </div>
    );
}

export const VerifySignatureButton: React.FC = () => {

    const [pubKey, setPubKey] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [signatureResult, setSignatureResult] = useState<boolean | null>(null);

    return (
        <div style={{ textAlign: 'center' }}>
            <p>🔑Public Key</p>
            <input type="text" id="publickey" placeholder="Enter public key to verify signature with" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setPubKey(e.target.value)}/>
            <br />
            <p>📝Message</p>
            <input type="text" id="message" placeholder="Enter message to verify" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setMessage(e.target.value)}/>
            <br />
            <p>🔏Signature</p>
            <input type="text" id="signature" placeholder="Enter signature to verify" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setSignature(e.target.value)}/>
            <br />
            <button
                className="btn btn-primary"
                style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', margin: '10px' }}
                onClick={() => {
                    if (signature && pubKey && message) {
                        checkSig(signature, pubKey, message).then((res) => {
                            if (res) {
                                setSignatureResult(res);
                            } else {
                                setSignatureResult(false);
                            }
                        });
                    }
                }}
            >
                Verify Signature
            </button>

            {signatureResult !== null && (
                <>
                    <p>Signature Result:</p>
                    <p>{signatureResult ? 'Signature valid! The Signature of the Message was created with the Secret Key that corresponds to the provided Public Key.' : 'Signature invalid! Double check your inputs are correct'}</p>
                </>
            )}
        </div>
    )
}

