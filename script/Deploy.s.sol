// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console2.sol";
import "../src/MomoCandieNFT.sol";

/**
 * @title  Deploy — Momo Candie Cameo Unit Series
 * @notice Foundry deployment script for Mainnet, Sepolia, Base, Base Sepolia
 *
 * ─── USAGE ───────────────────────────────────────────────────────────────────
 *
 * Sepolia (dry run):
 *   forge script script/Deploy.s.sol:Deploy \
 *     --rpc-url $SEPOLIA_RPC \
 *     --private-key $DEPLOYER_KEY \
 *     -vvvv
 *
 * Sepolia (broadcast + verify):
 *   forge script script/Deploy.s.sol:Deploy \
 *     --rpc-url $SEPOLIA_RPC \
 *     --private-key $DEPLOYER_KEY \
 *     --broadcast \
 *     --verify \
 *     --etherscan-api-key $ETHERSCAN_KEY \
 *     -vvvv
 *
 * Base Mainnet:
 *   forge script script/Deploy.s.sol:Deploy \
 *     --rpc-url $BASE_RPC \
 *     --private-key $DEPLOYER_KEY \
 *     --broadcast \
 *     --verify \
 *     --etherscan-api-key $BASESCAN_KEY \
 *     -vvvv
 *
 * Mainnet:
 *   forge script script/Deploy.s.sol:Deploy \
 *     --rpc-url $MAINNET_RPC \
 *     --private-key $DEPLOYER_KEY \
 *     --broadcast \
 *     --verify \
 *     --etherscan-api-key $ETHERSCAN_KEY \
 *     -vvvv
 *
 * ─── ENV VARS REQUIRED ───────────────────────────────────────────────────────
 *  DEPLOYER_KEY      private key of deployer wallet
 *  DEPLOYER_ADDR     deployer address (owner of contract)
 *  BASE_TOKEN_URI    ipfs://QmMETA_CID/ (trailing slash required)
 *  SEPOLIA_RPC       https://eth-sepolia.g.alchemy.com/v2/…
 *  MAINNET_RPC       https://eth-mainnet.g.alchemy.com/v2/…
 *  BASE_RPC          https://mainnet.base.org
 *  BASE_SEPOLIA_RPC  https://sepolia.base.org
 *  ETHERSCAN_KEY     Etherscan API key
 *  BASESCAN_KEY      Basescan API key
 * ─────────────────────────────────────────────────────────────────────────────
 */
contract Deploy is Script {

    // ── Post-deploy config ───────────────────────────────────────────────────
    // Set to true to activate mint immediately after deployment.
    // Leave false for a staged launch (call toggleMint separately).
    bool constant ACTIVATE_MINT_ON_DEPLOY = false;

    function run() external {
        // ── Load env ────────────────────────────────────────────────────────
        address deployer = vm.envAddress("DEPLOYER_ADDR");
        string memory baseURI = vm.envString("BASE_TOKEN_URI");

        require(bytes(baseURI).length > 0, "Deploy: BASE_TOKEN_URI not set");
        require(deployer != address(0),    "Deploy: DEPLOYER_ADDR not set");

        console2.log("=================================================");
        console2.log(" MOMO CANDIE — CAMEO UNIT SERIES");
        console2.log(" Deploying MomoCandieNFT...");
        console2.log("=================================================");
        console2.log(" Deployer   :", deployer);
        console2.log(" Chain ID   :", block.chainid);
        console2.log(" Base URI   :", baseURI);
        console2.log(" Mint active:", ACTIVATE_MINT_ON_DEPLOY);

        vm.startBroadcast();

        // ── Deploy ───────────────────────────────────────────────────────────
        MomoCandieNFT nft = new MomoCandieNFT(deployer);

        console2.log(" Contract   :", address(nft));

        // ── Set base URI ─────────────────────────────────────────────────────
        nft.setBaseURI(baseURI);
        console2.log(" Base URI set.");

        // ── Optionally activate mint ─────────────────────────────────────────
        if (ACTIVATE_MINT_ON_DEPLOY) {
            nft.toggleMint(true);
            console2.log(" Mint ACTIVATED.");
        } else {
            console2.log(" Mint INACTIVE. Call toggleMint(true) when ready.");
        }

        vm.stopBroadcast();

        // ── Verify supply caps ───────────────────────────────────────────────
        _verifySupplyCaps(nft);

        console2.log("=================================================");
        console2.log(" DEPLOYMENT COMPLETE");
        console2.log(" THE FREQUENCY IS THE PROOF OF WORK. STRAWBERRY.");
        console2.log("=================================================");
    }

    function _verifySupplyCaps(MomoCandieNFT nft) internal view {
        uint256[7] memory expected = [
            uint256(1),    // 00 TR3ASURY_PR1M3  MYTHIC
            uint256(52),   // 01 G0V_S1GN4L      LEGENDARY
            uint256(263),  // 02 SQU4DS_W4TCH    EPIC
            uint256(788),  // 03 JLP_DREAM3R     RARE
            uint256(1313), // 04 SYR_UP_FL0W     UNCOMMON
            uint256(2100), // 05 WH1T3_N01SE_000 COMMON
            uint256(52)    // 06 ORACLE_C0R3     LEGENDARY
        ];

        uint256 total;
        for (uint8 i = 0; i < 7; i++) {
            MomoCandieNFT.UnitID uid = MomoCandieNFT.UnitID(i);
            uint256 cap = nft.unitSupplyCap(uid);
            require(cap == expected[i], "Deploy: Supply cap mismatch");
            total += cap;
            console2.log(" Unit", i, "cap:", cap);
        }
        require(total == 4569, "Deploy: Total supply mismatch");
        console2.log(" Total supply verified:", total);
    }
}
