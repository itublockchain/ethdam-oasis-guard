forge create --rpc-url https://testnet.sapphire.oasis.io \
  --private-key $PRIVATE_KEY \
  Contract \
  --verify \
  --verifier sourcify \
  --verifier-url https://sourcify.dev