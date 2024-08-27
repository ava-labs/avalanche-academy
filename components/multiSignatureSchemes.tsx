"use client";
import React, { useState } from 'react';
const bls = require("@noble/bls12-381");

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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginRight: '20px' }}>
                <button
                    className="btn btn-primary"
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        margin: '10px'
                    }}
                    onClick={generateKeys1}
                >
                    Generate Keys
                </button>

                <div style={{ padding: '10px' }}>
                    <p>🗝️Private Key: {privKey1?.substring(0, 6)}...</p>
                    <button
                        onClick={() => copyToClipboard(privKey1 ? String(privKey1) : '')}
                        style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginRight: '5px' }}
                    >
                        Copy Private Key
                    </button>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🔑Public Key: {pubKey1?.substring(0, 6)}...</p>
                    <button
                        onClick={() => copyToClipboard(pubKey1 ? String(pubKey1) : '')}
                        style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginRight: '5px' }}
                    >
                        Copy Public Key
                    </button>
                </div>
            </div>

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
                    onClick={generateKeys2}
                >
                    Generate Keys
                </button>

                <div style={{ padding: '10px' }}>
                    <p>🗝️Private Key: {privKey2?.substring(0, 6)}...</p>
                    <button
                        onClick={() => copyToClipboard(privKey2 ? String(privKey2) : '')}
                        style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginRight: '5px' }}
                    >
                        Copy Private Key
                    </button>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🔑Public Key: {pubKey2?.substring(0, 6)}...</p>
                    <button
                        onClick={() => copyToClipboard(pubKey2 ? String(pubKey2) : '')}
                        style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginRight: '5px' }}
                    >
                        Copy Public Key
                    </button>
                </div>
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
                <input type="text" id="privatekey1" placeholder="Enter private key to sign message with" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setPrivKey1(e.target.value)} />
                <br />
                <p>📝Message</p>
                <input type="text" id="message1" placeholder="Enter message to sign" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setMessage1(e.target.value)} />

                <button
                    className="btn btn-primary"
                    style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', margin: '10px' }}
                    onClick={signMessage1}
                >
                    Sign Message
                </button>

                {showSignature1 && (
                    <>
                        <p>Signature 1:</p>
                        <p style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>{signature1}</p>
                    </>
                )}
            </div>

            <div style={{ textAlign: 'center' }}>
                <p>🗝️Private Key</p>
                <input type="text" id="privatekey2" placeholder="Enter private key to sign message with" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setPrivKey2(e.target.value)} />
                <br />
                <p>📝Message</p>
                <input type="text" id="message2" placeholder="Enter message to sign" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setMessage2(e.target.value)} />

                <button
                    className="btn btn-primary"
                    style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px', margin: '10px' }}
                    onClick={signMessage2}
                >
                    Sign Message
                </button>

                {showSignature2 && (
                    <>
                        <p>Signature 2:</p>
                        <p style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>{signature2}</p>
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
            <input
                type="text"
                id="signature1"
                placeholder="Enter signature 1"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                onChange={(e) => setSignature1(e.target.value)}
            />
            <input
                type="text"
                id="signature2"
                placeholder="Enter signature 2"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                onChange={(e) => setSignature2(e.target.value)}
            />
            <button
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    marginRight: '5px',
                }}
                onClick={() => {
                    if (signature1 && signature2) {
                        setAggregatedSignature(bufferToHex(bls.aggregateSignatures([signature1, signature2])));
                        setShowAggregatedSignature(true);
                    }
                }}>
                Aggregate Signatures
            </button>

            {showAggregatedSignature && (
                <>
                    <p>Aggregated Signature:</p>
                    <p style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>{aggregatedSignature}</p>
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
            <input
                type="text"
                id="pubkey1"
                placeholder="Enter public key 1"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                onChange={(e) => setPubKey1(e.target.value)}

            />
            <input
                type="text"
                id="pubkey2"
                placeholder="Enter public key 2"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                onChange={(e) => setPubKey2(e.target.value)}

            />
            <button
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    marginRight: '5px',
                }}
                onClick={() => {
                    if (pubKey1 && pubKey2) {
                        setAggregatedPubKey(bufferToHex(bls.aggregatePublicKeys([pubKey1, pubKey2])));
                        setShowAggregatedPubKey(true);
                    }
                }}>
                Aggregate Public Keys
            </button>

            {showAggregatedPubKey && (
                <>
                    <p>Aggregated Public Key:</p>
                    <p style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>{aggregatedPubKey}</p>
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
        <input type="text" id="publickey" placeholder="Enter aggregated public key to verify with" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setPubKey(e.target.value)}/>
        <br />
        <p>🔏Aggregated Signature</p>
        <input type="text" id="signature" placeholder="Enter aggregated signature to verify" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setSignature(e.target.value)}/>
        <br />
        <p>📝Message</p>
        <input type="text" id="message" placeholder="Enter message to verify" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} onChange={(e) => setMessage(e.target.value)}/>
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
            Verify
        </button>

        {signatureResult !== null && (
            <>
                <p>Signature Result:</p>
                <p>{signatureResult ? 'Aggregated Signature valid! The Aggregated Signature of the Message was created with the Secret Key that corresponds to the provided Public Key.' : 'Signature invalid! Double check your inputs are correct'}</p>
            </>
        )}
    </div>
    )
}

