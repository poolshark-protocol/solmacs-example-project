#[macro_export]

macro_rules! linkWallet {
    ($_wallet, $_newFlag, $_joinFlag, $_addFlag) => {
        address wallet0 = msg.sender > $_wallet ? msg.sender : $_wallet;
        address wallet1 = msg.sender > $_wallet ? $_wallet : msg.sender;

        uint256 status = walletStatuses[wallet0][wallet1];

        if (status == $_newFlag) {   
            // nothing to update
            return (false, false);
        }
        if (status == $_joinFlag) {
            // delete entry in mapping
            walletStatuses[wallet0][wallet1] = FLAG_JOINED!();

            wallets[$_wallet].nextWallet = wallets[msg.sender].nextWallet == address(0)
                ? msg.sender
                : wallets[msg.sender].nextWallet;
            wallets[msg.sender].nextWallet = $_wallet;
            return (true, false);
        }
        if (status == $_addFlag) {
            walletStatuses[wallet0][wallet1] = FLAG_ADDED!();
            return (false, true);
        }
        return (false, false);
    }
}

macro_rules! getWalletInList {
    ($_wallet, $_codeEndList, $_codeBlock1, $_codeBlock2, $_codeBlock3, $_lenFlag) => {
        if (wallets[$_wallet].nextWallet == address(0)) {
            $_codeEndList
        }

        defineLen!($_lenFlag)

        address buffer = $_wallet;
        // get the len of the array
        for (setLen!($_lenFlag); wallets[buffer].nextWallet != $_wallet; incrementLen!($_lenFlag)) {
            $_codeBlock1
            buffer = wallets[buffer].nextWallet;
        }

        $_codeBlock2

        handleWalletBuffer($_codeBlock3)
    }
}