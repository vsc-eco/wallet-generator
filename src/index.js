import nacl from 'tweetnacl';
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from 'key-did-resolver';
import { DID } from "dids";

// Generate a new Ed25519 key pair
const keyPair = nacl.sign.keyPair();

// Extract the private key and public key
const privateBytes = keyPair.secretKey.slice(0, nacl.sign.secretKeyLength / 2);

// Convert to hexadecimal
const privateHex = Buffer.from(privateBytes);
const keyPrivate = new Ed25519Provider(privateHex)
const did = new DID({ provider: keyPrivate, resolver: KeyResolver.getResolver() })
await did.authenticate()

console.log('Your VSC lite account wallet credentials')
console.log(`Public key: ${did.id}`);
console.log(`Private key: ${privateHex.toString('hex')}`);