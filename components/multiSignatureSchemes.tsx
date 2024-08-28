"use client";
import React, { useState } from 'react';
const bls = require("@noble/bls12-381");
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
    const [privKey1, setPrivKey1] = useState<string | null>(null);
    const [pubKey1, setPubKey1] = useState<string | null>(null);

    const [privKey2, setPrivKey2] = useState<string | null>(null);
    const [pubKey2, setPubKey2] = useState<string | null>(null);

    const generateKeys1 = () => {
        const privKey = new Uint8Array(32);
        crypto.getRandomValues(privKey);
        const pubKey = bufferToHex(bls.getPublicKey(privKey));
        setPrivKey1(bufferToHex(privKey));
        setPubKey1(pubKey);
        return { privKey, pubKey };
    };

    const generateKeys2 = () => {
        const privKey = new Uint8Array(32);
        crypto.getRandomValues(privKey);
        const pubKey = bufferToHex(bls.getPublicKey(privKey));
        setPrivKey2(bufferToHex(privKey));
        setPubKey2(pubKey);
        return { privKey, pubKey };
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginRight: '20px', marginBottom: '20px' }}>
                <button className={buttonVariants()} onClick={generateKeys1}>
                    Generate First Keypair
                </button>

                {privKey1 && <CodeBlock title="🗝️ Private Key" lang="bash" allowCopy={true}>
                    <Pre>{privKey1}</Pre>
                </CodeBlock>}

                {pubKey1 && <CodeBlock title="🔑 Public Key:" lang="bash" allowCopy={true}>
                    <Pre>{pubKey1}</Pre>
                </CodeBlock>}
            </div>

            <div style={{ textAlign: 'center' }}>
                <button className={buttonVariants()} onClick={generateKeys2}>
                    Generate Second Keypair
                </button>

                {privKey2 && <CodeBlock title="🗝️ Private Key" lang="bash" allowCopy={true}>
                    <Pre>{privKey2}</Pre>
                </CodeBlock>}

                {pubKey2 && <CodeBlock title="🔑 Public Key:" lang="bash" allowCopy={true}>
                    <Pre>{pubKey2}</Pre>
                </CodeBlock>}
            </div>
        </div>
    );
}

export const SignMessageButton: React.FC = () => {
    const [privKey1, setPrivKey1] = useState<string | null>(null);
    const [message1, setMessage1] = useState<string | null>(null);
    const [signature1, setSignature1] = useState<string | null>(null);

    const [privKey2, setPrivKey2] = useState<string | null>(null);
    const [message2, setMessage2] = useState<string | null>(null);
    const [signature2, setSignature2] = useState<string | null>(null);

    const [showSignature1, setShowSignature1] = useState(false);
    const [showSignature2, setShowSignature2] = useState(false);

    const signMessage1 = async () => {
        if (!privKey1 || !message1) {
            return;
        }
        setSignature1(bufferToHex(await bls.sign(new TextEncoder().encode(message1), privKey1)));
        setShowSignature1(true);
    }

    const signMessage2 = async () => {
        if (!privKey2 || !message2) {
            return;
        }
        setSignature2(bufferToHex(await bls.sign(new TextEncoder().encode(message2), privKey2)));
        setShowSignature2(true);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginRight: '20px' }}>
                <p>🗝️Private Key</p>
                <Input id="privatekey1" placeholder="Enter private key to sign message with" onChange={(e) => setPrivKey1(e.target.value)} />
                <br />
                <p>📝Message</p>
                <Input id="message1" placeholder="Enter message to sign" onChange={(e) => setMessage1(e.target.value)} />

                <button className={buttonVariants()} onClick={signMessage1}>
                    Sign Message
                </button>

                {showSignature1 && (
                    <>
                         {signature1 && <CodeBlock title="🔏 Signature:" lang="bash" allowCopy={true} style={{ maxWidth: '350px', margin: '0 auto' }}>
                            <Pre>{signature1}</Pre>
                        </CodeBlock>}
                    </>
                )}
            </div>

            <div style={{ textAlign: 'center' }}>
                <p>🗝️Private Key</p>
                <Input id="privatekey2" placeholder="Enter private key to sign message with" onChange={(e) => setPrivKey2(e.target.value)} />
                <br />
                <p>📝Message</p>
                <Input id="message2" placeholder="Enter message to sign" onChange={(e) => setMessage2(e.target.value)} />

                <button className={buttonVariants()} onClick={signMessage2}>
                    Sign Message
                </button>

                {showSignature2 && (
                    <>
                        {signature2 && <CodeBlock title="🔏 Signature:" lang="bash" allowCopy={true} style={{ maxWidth: '350px', margin: '0 auto' }}>
                            <Pre>{signature2}</Pre>
                        </CodeBlock>}
                    </>
                )}
            </div>
        </div>
    );
}

export const AggregateSignaturesButton: React.FC = () => {

    const [signature1, setSignature1] = useState<string | null>(null);
    const [signature2, setSignature2] = useState<string | null>(null);
    const [aggregatedSignature, setAggregatedSignature] = useState<string | null>(null);
    const [showAggregatedSignature, setShowAggregatedSignature] = useState(false);

    return (
        <div style={{ textAlign: 'center' }}>
            <Input
                id="signature1"
                placeholder="Enter signature 1"
                onChange={(e) => setSignature1(e.target.value)}
            />
            <Input
                id="signature2"
                placeholder="Enter signature 2"
                onChange={(e) => setSignature2(e.target.value)}
            />
            <button className={buttonVariants()} onClick={() => {
                 if (signature1 && signature2) {
                    setAggregatedSignature(bufferToHex(bls.aggregateSignatures([signature1, signature2])));
                    setShowAggregatedSignature(true);
                }
            }}>
                Aggregate Signatures
            </button>
            

            {showAggregatedSignature && (
                <>
                    {aggregatedSignature && <CodeBlock title="🔏 Signature:" lang="bash" allowCopy={true}>
                            <Pre>{aggregatedSignature}</Pre>
                    </CodeBlock>}
                </>
            )}
        </div>
    );
}
export const AggregatePublicKeysButton: React.FC = () => {

    const [pubKey1, setPubKey1] = useState<string | null>(null);
    const [pubKey2, setPubKey2] = useState<string | null>(null);
    const [aggregatedPubKey, setAggregatedPubKey] = useState<string | null>(null);
    const [showAggregatedPubKey, setShowAggregatedPubKey] = useState(false);

    return(
        <div style={{ textAlign: 'center' }}>
            <Input
                id="pubkey1"
                placeholder="Enter public key 1"
                onChange={(e) => setPubKey1(e.target.value)}

            />
            <Input
                id="pubkey2"
                placeholder="Enter public key 2"
                onChange={(e) => setPubKey2(e.target.value)}

            />

                <button className={buttonVariants()} onClick={() => {
                     if (pubKey1 && pubKey2) {
                        setAggregatedPubKey(bufferToHex(bls.aggregatePublicKeys([pubKey1, pubKey2])));
                        setShowAggregatedPubKey(true);
                    }
                }}>
                Aggregate Public Keys
                </button>

            {showAggregatedPubKey && (
                <>
                    {aggregatedPubKey && <CodeBlock title="🔑 Public Key:" lang="bash" allowCopy={true}>
                            <Pre>{aggregatedPubKey}</Pre>
                    </CodeBlock>}
                </>
            )}
        </div>
    )
}
export const VerifyAggregateSignatureButton: React.FC = () => {
    const [pubKey, setPubKey] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [signatureResult, setSignatureResult] = useState<boolean | null>(null);

    return(
        <div style={{ textAlign: 'center' }}>
        <p>🔑Aggregated Public Key</p>
        <Input id="publickey" placeholder="Enter aggregated public key to verify with" onChange={(e) => setPubKey(e.target.value)}/>
        <br />
        <p>🔏Aggregated Signature</p>
        <Input id="signature" placeholder="Enter aggregated signature to verify" onChange={(e) => setSignature(e.target.value)}/>
        <br />
        <p>📝Message</p>
        <Input id="message" placeholder="Enter message to verify" onChange={(e) => setMessage(e.target.value)}/>
        <br />

        <button className={buttonVariants()} onClick={() => {
                     if (signature && pubKey && message) {
                        checkSig(signature, pubKey, message).then((res) => {
                            if (res) {
                                setSignatureResult(res);
                            } else {
                                setSignatureResult(false);
                            }
                        });
                    }
                }}>
                Verify        
        </button>

        {signatureResult !== null && (
                <p>{signatureResult ? '✅ Signature is valid!' : '❌ Signature is invalid!'}</p>
            )}
    </div>
    )
}

