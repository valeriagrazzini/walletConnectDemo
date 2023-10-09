import { Button, useToast } from '@chakra-ui/react'
import { useAccount, useSignMessage } from 'wagmi'
import {utils} from 'ethers'
import { useState } from 'react'

export function ConnectButton() {
  const [publicKey, setPublicKey] = useState('')
  const toast = useToast()
  const { isConnected, address } = useAccount()
  const message = 'This is the Message!';
  const { signMessageAsync} = useSignMessage({ message})

  async function onSignMessage() {
    try {
      const signature = await signMessageAsync()
      const recoveredPublicKey = await recoverPublicKey(message, signature)
      setPublicKey(recoveredPublicKey || '')
      toast({ title: 'Succcess', description: signature, status: 'success', isClosable: true })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to sign message',
        status: 'error',
        isClosable: true
      })
    }
  }

  // Verify and recover the public key
  async function recoverPublicKey(message:string, signature:string) {
    try {
      // Approach 2
      const msgHash = utils.hashMessage(message);
      const msgHashBytes = utils.arrayify(msgHash);

      // Now you have the digest,
      const recoveredPubKey = utils.recoverPublicKey(msgHashBytes, signature);
      const recoveredAddress = utils.recoverAddress(msgHashBytes, signature);

      console.log('RESULT', {recoveredPubKey, recoveredAddress, address})
      console.log('MATCH BETWEEN ADDRESSES', recoveredAddress === address)
      return recoveredPubKey;

    } catch (error) {
      console.error('Error recovering public key:', error);
    }
  }

  return (
    <>
      <w3m-button />
      {isConnected ? <Button onClick={() => onSignMessage()}>Sign Message</Button>  : null}
      {isConnected ? 
        <div>
          <div>Address: {address}</div>
          <div>Public Key: {publicKey}</div>
        </div>  : null
      } 
    </>
  )
}
