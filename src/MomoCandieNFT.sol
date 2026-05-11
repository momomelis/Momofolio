// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title  Momo Candie — Cameo Unit Series
/// @notice Seven-tier ERC-721 with per-unit supply caps.
contract MomoCandieNFT is ERC721, Ownable {

    // ── Types ────────────────────────────────────────────────────────────────

    enum UnitID {
        TR3ASURY_PR1M3,   // 00  MYTHIC       cap:    1
        G0V_S1GN4L,       // 01  LEGENDARY    cap:   52
        SQU4DS_W4TCH,     // 02  EPIC         cap:  263
        JLP_DREAM3R,      // 03  RARE         cap:  788
        SYR_UP_FL0W,      // 04  UNCOMMON     cap: 1313
        WH1T3_N01SE_000,  // 05  COMMON       cap: 2100
        ORACLE_C0R3       // 06  LEGENDARY    cap:   52
    }                     //                 total: 4569

    struct UnitInfo {
        uint256 supplyCap;
        uint256 minted;
    }

    // ── Storage ──────────────────────────────────────────────────────────────

    mapping(UnitID => UnitInfo) private _units;
    mapping(uint256 => UnitID)  public  tokenUnit;

    string  private _baseTokenURI;
    bool    public  mintActive;
    uint256 private _nextId;

    // ── Events ───────────────────────────────────────────────────────────────

    event MintToggled(bool active);
    event BaseURISet(string uri);
    event Minted(address indexed to, UnitID indexed uid, uint256 tokenId);

    // ── Constructor ──────────────────────────────────────────────────────────

    constructor(address initialOwner)
        ERC721("Momo Candie Cameo Unit Series", "MCCUS")
        Ownable(initialOwner)
    {
        _units[UnitID.TR3ASURY_PR1M3]  = UnitInfo({supplyCap:    1, minted: 0});
        _units[UnitID.G0V_S1GN4L]      = UnitInfo({supplyCap:   52, minted: 0});
        _units[UnitID.SQU4DS_W4TCH]    = UnitInfo({supplyCap:  263, minted: 0});
        _units[UnitID.JLP_DREAM3R]     = UnitInfo({supplyCap:  788, minted: 0});
        _units[UnitID.SYR_UP_FL0W]     = UnitInfo({supplyCap: 1313, minted: 0});
        _units[UnitID.WH1T3_N01SE_000] = UnitInfo({supplyCap: 2100, minted: 0});
        _units[UnitID.ORACLE_C0R3]     = UnitInfo({supplyCap:   52, minted: 0});
    }

    // ── View ─────────────────────────────────────────────────────────────────

    function unitSupplyCap(UnitID uid) external view returns (uint256) {
        return _units[uid].supplyCap;
    }

    function unitMinted(UnitID uid) external view returns (uint256) {
        return _units[uid].minted;
    }

    function totalMinted() external view returns (uint256) {
        return _nextId;
    }

    // ── Owner ─────────────────────────────────────────────────────────────────

    function setBaseURI(string calldata uri) external onlyOwner {
        _baseTokenURI = uri;
        emit BaseURISet(uri);
    }

    function toggleMint(bool active) external onlyOwner {
        mintActive = active;
        emit MintToggled(active);
    }

    /// @notice Owner-controlled mint for airdrops and reserved allocations.
    function adminMint(address to, UnitID uid, uint256 qty) external onlyOwner {
        _mintUnit(to, uid, qty);
    }

    // ── Internal ──────────────────────────────────────────────────────────────

    function _mintUnit(address to, UnitID uid, uint256 qty) internal {
        UnitInfo storage u = _units[uid];
        require(u.minted + qty <= u.supplyCap, "MomoCandieNFT: cap exceeded");
        unchecked {
            for (uint256 i; i < qty; ++i) {
                uint256 id = _nextId++;
                tokenUnit[id] = uid;
                u.minted++;
                _safeMint(to, id);
                emit Minted(to, uid, id);
            }
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
