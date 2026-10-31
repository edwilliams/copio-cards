/**
 * Barcode & QR Code Vector Engine + Live Camera Barcode/QR Scanner (Pure JavaScript & SVG)
 * Generates crisp, standards-compliant SVG barcodes (Code 128, EAN-13, ISO/IEC 18004 QR Code)
 * and decodes barcodes/QR codes from live camera streams or canvas frames.
 * Zero external network requests, 100% offline.
 */

// Standard Code 128 Patterns (Table B, indices 0..106)
export const CODE128_PATTERNS = [
  "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213",
  "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132",
  "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211",
  "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313",
  "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331",
  "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111",
  "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214",
  "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111",
  "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141",
  "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141",
  "114131", "311141", "411131", "211412", "211214", "211232", "2331112"
];

// EAN-13 Digit Encodings: L-code, G-code, R-code
export const EAN_L = [
  "0001101", "0011001", "0010011", "0111101", "0100011",
  "0110001", "0101111", "0111011", "0110111", "0001011"
];
export const EAN_G = [
  "0100111", "0110011", "0011011", "0100001", "0011101",
  "0111001", "0000101", "0010001", "0001001", "0010111"
];
export const EAN_R = [
  "1110010", "1100110", "1101100", "1000010", "1011100",
  "1001110", "1010000", "1000100", "1001000", "1110100"
];

// Parity structures for first digit of EAN-13
export const EAN_PARITY = [
  "LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG",
  "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"
];

/**
 * Encodes text into Code 128 (Subtype B) binary sequence
 * @param {string} text
 * @returns {string} Binary string of '1's and '0's
 */
export function encodeCode128B(text) {
  const START_B = 104;
  const STOP = 106;
  const indices = [START_B];

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32;
    if (code >= 0 && code <= 95) {
      indices.push(code);
    }
  }

  let checksum = indices[0];
  for (let i = 1; i < indices.length; i++) {
    checksum += indices[i] * i;
  }
  checksum %= 103;
  indices.push(checksum);
  indices.push(STOP);

  let binary = "";
  for (const idx of indices) {
    const pattern = CODE128_PATTERNS[idx];
    let isBar = true;
    for (const char of pattern) {
      const runLen = parseInt(char, 10);
      binary += (isBar ? "1" : "0").repeat(runLen);
      isBar = !isBar;
    }
  }
  binary += "11"; // Terminal bar
  return binary;
}

/**
 * Encodes 12-13 numeric digits into standard EAN-13 binary sequence.
 * Falls back to Code 128B if the input is not 12 or 13 digits so no digits are truncated.
 * @param {string} digits
 * @returns {string} Binary string of '1's and '0's
 */
export function encodeEan13(digits) {
  const clean = digits.replace(/\D/g, "");
  if (clean.length < 12 || clean.length > 13) {
    return encodeCode128B(digits);
  }

  const d = clean.slice(0, 12).split("").map(Number);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += i % 2 === 0 ? d[i] : d[i] * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  const full13 = [...d, checkDigit];

  const firstDigit = full13[0];
  const parity = EAN_PARITY[firstDigit];

  let binary = "101"; // Start guard

  for (let i = 1; i <= 6; i++) {
    const digit = full13[i];
    const isG = parity[i - 1] === "G";
    binary += isG ? EAN_G[digit] : EAN_L[digit];
  }

  binary += "01010"; // Center guard

  for (let i = 7; i <= 12; i++) {
    const digit = full13[i];
    binary += EAN_R[digit];
  }

  binary += "101"; // Stop guard
  return binary;
}

/**
 * Generates high-contrast SVG for 1D Barcode (EAN-13 or Code 128)
 * @param {string} value
 * @param {'ean13'|'code128'|'auto'} [type='auto']
 * @returns {string} SVG string
 */
export function generateBarcode1D(value, type = 'auto') {
  if (!value) return '';

  const trimmed = value.trim();
  const isEan13Length = /^\d{12,13}$/.test(trimmed);
  const useEan = (type === 'ean13' && isEan13Length) || (type === 'auto' && isEan13Length);
  const binary = useEan ? encodeEan13(trimmed) : encodeCode128B(trimmed);

  const barWidth = 2.2;
  const height = 80;
  const quietZone = 18;
  const totalWidth = binary.length * barWidth + quietZone * 2;

  let rects = '';
  let i = 0;
  while (i < binary.length) {
    if (binary[i] === '1') {
      let run = 1;
      while (i + run < binary.length && binary[i + run] === '1') {
        run++;
      }
      const x = (quietZone + i * barWidth).toFixed(1);
      const w = (run * barWidth).toFixed(1);
      rects += `<rect x="${x}" y="4" width="${w}" height="${height - 8}" fill="#000000" />`;
      i += run;
    } else {
      i++;
    }
  }

  return `<svg viewBox="0 0 ${totalWidth.toFixed(1)} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <rect width="${totalWidth.toFixed(1)}" height="${height}" fill="#ffffff" />
    ${rects}
  </svg>`;
}

/* ==========================================================================
   ISO/IEC 18004 QR CODE MATRIX ENCODER (Pure JS, Synchronous)
   ========================================================================== */

const QR_PAD0 = 0xec;
const QR_PAD1 = 0x11;
const QR_MODE_8BIT_BYTE = 4;
const QR_EC_LEVEL_M = 0; // Medium (15%) error correction

const QR_PATTERN_POSITION_TABLE = [
  [],
  [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
  [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54],
];

// RS Block table for Type 1..10 at Error Correction Level M
const QR_RS_BLOCK_TABLE_M = [
  [1, 26, 16],
  [1, 44, 28],
  [1, 70, 44],
  [2, 50, 32],
  [2, 67, 43],
  [4, 43, 27],
  [4, 49, 31],
  [2, 60, 38, 2, 61, 39],
  [3, 58, 36, 2, 59, 37],
  [4, 69, 43, 1, 70, 44],
];

const QR_EXP_TABLE = Array.from({ length: 256 }, () => 0);
const QR_LOG_TABLE = Array.from({ length: 256 }, () => 0);
for (let i = 0; i < 8; i++) QR_EXP_TABLE[i] = 1 << i;
for (let i = 8; i < 256; i++) {
  QR_EXP_TABLE[i] = QR_EXP_TABLE[i - 4] ^ QR_EXP_TABLE[i - 5] ^ QR_EXP_TABLE[i - 6] ^ QR_EXP_TABLE[i - 8];
}
for (let i = 0; i < 255; i++) QR_LOG_TABLE[QR_EXP_TABLE[i]] = i;

function qrGlog(n) {
  return QR_LOG_TABLE[n];
}

function qrGexp(n) {
  while (n < 0) n += 255;
  while (n >= 256) n -= 255;
  return QR_EXP_TABLE[n];
}

function createQrPolynomial(num, shift) {
  let offset = 0;
  while (offset < num.length && num[offset] === 0) offset++;
  const coeffs = Array.from({ length: num.length - offset + shift }, () => 0);
  for (let i = 0; i < num.length - offset; i++) coeffs[i] = num[i + offset];

  return {
    getAt: (idx) => coeffs[idx],
    getLength: () => coeffs.length,
    multiply(other) {
      const res = Array.from({ length: coeffs.length + other.getLength() - 1 }, () => 0);
      for (let i = 0; i < coeffs.length; i++) {
        for (let j = 0; j < other.getLength(); j++) {
          res[i + j] ^= qrGexp(qrGlog(coeffs[i]) + qrGlog(other.getAt(j)));
        }
      }
      return createQrPolynomial(res, 0);
    },
    mod(other) {
      if (coeffs.length - other.getLength() < 0) return this;
      const ratio = qrGlog(coeffs[0]) - qrGlog(other.getAt(0));
      const res = [...coeffs];
      for (let i = 0; i < other.getLength(); i++) {
        res[i] ^= qrGexp(qrGlog(other.getAt(i)) + ratio);
      }
      return createQrPolynomial(res, 0).mod(other);
    },
  };
}

function getBCHDigit(data) {
  let digit = 0;
  while (data !== 0) {
    digit++;
    data >>>= 1;
  }
  return digit;
}

function getBCHTypeInfo(data) {
  const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | 1;
  const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
  let d = data << 10;
  while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
    d ^= G15 << (getBCHDigit(d) - getBCHDigit(G15));
  }
  return ((data << 10) | d) ^ G15_MASK;
}

function getMaskFunction(maskPattern) {
  switch (maskPattern) {
    case 0: return (i, j) => (i + j) % 2 === 0;
    case 1: return (i) => i % 2 === 0;
    case 2: return (_, j) => j % 3 === 0;
    case 3: return (i, j) => (i + j) % 3 === 0;
    case 4: return (i, j) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
    case 5: return (i, j) => ((i * j) % 2) + ((i * j) % 3) === 0;
    case 6: return (i, j) => (((i * j) % 2) + ((i * j) % 3)) % 2 === 0;
    case 7: return (i, j) => (((i * j) % 3) + ((i + j) % 2)) % 2 === 0;
    default: return (i, j) => (i + j) % 2 === 0;
  }
}

function getRsBlocks(typeNumber) {
  const entry = QR_RS_BLOCK_TABLE_M[typeNumber - 1] || QR_RS_BLOCK_TABLE_M[0];
  const list = [];
  for (let i = 0; i < entry.length / 3; i++) {
    const count = entry[i * 3];
    const totalCount = entry[i * 3 + 1];
    const dataCount = entry[i * 3 + 2];
    for (let j = 0; j < count; j++) {
      list.push({ totalCount, dataCount });
    }
  }
  return list;
}

function utf8StringToBytes(str) {
  if (typeof TextEncoder !== 'undefined') {
    return Array.from(new TextEncoder().encode(str));
  }
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i) & 0xff);
  }
  return bytes;
}

/**
 * Encodes text into a 2D boolean QR matrix according to ISO/IEC 18004
 * @param {string} text
 * @returns {boolean[][]}
 */
export function encodeQRMatrix(text) {
  const bytes = utf8StringToBytes(text);

  // Pick smallest typeNumber (1..10) that fits
  let typeNumber = 1;
  for (; typeNumber <= 10; typeNumber++) {
    const blocks = getRsBlocks(typeNumber);
    const totalDataBytes = blocks.reduce((acc, b) => acc + b.dataCount, 0);
    const lenBits = typeNumber < 10 ? 8 : 16;
    if (4 + lenBits + bytes.length * 8 <= totalDataBytes * 8) {
      break;
    }
  }
  if (typeNumber > 10) typeNumber = 10;

  const rsBlocks = getRsBlocks(typeNumber);
  const totalDataCount = rsBlocks.reduce((acc, b) => acc + b.dataCount, 0);

  // Build bit buffer
  const bitBuf = [];
  let bitLen = 0;
  const putBit = (bit) => {
    const bufIdx = Math.floor(bitLen / 8);
    if (bitBuf.length <= bufIdx) bitBuf.push(0);
    if (bit) bitBuf[bufIdx] |= 0x80 >>> (bitLen % 8);
    bitLen++;
  };
  const putBits = (num, length) => {
    for (let i = 0; i < length; i++) {
      putBit(((num >>> (length - i - 1)) & 1) === 1);
    }
  };

  const lenBits = typeNumber < 10 ? 8 : 16;
  const maxBytes = Math.min(bytes.length, totalDataCount - 2);
  putBits(QR_MODE_8BIT_BYTE, 4);
  putBits(maxBytes, lenBits);
  for (let i = 0; i < maxBytes; i++) {
    putBits(bytes[i], 8);
  }

  if (bitLen + 4 <= totalDataCount * 8) putBits(0, 4);
  while (bitLen % 8 !== 0) putBit(false);
  while (bitLen < totalDataCount * 8) {
    putBits(QR_PAD0, 8);
    if (bitLen >= totalDataCount * 8) break;
    putBits(QR_PAD1, 8);
  }

  // Reed-Solomon error correction blocks
  let offset = 0;
  let maxDcCount = 0;
  let maxEcCount = 0;
  const dcdata = [];
  const ecdata = [];

  for (let r = 0; r < rsBlocks.length; r++) {
    const dcCount = rsBlocks[r].dataCount;
    const ecCount = rsBlocks[r].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);

    dcdata[r] = Array.from({ length: dcCount }, () => 0);
    for (let i = 0; i < dcCount; i++) {
      dcdata[r][i] = 0xff & (bitBuf[i + offset] || 0);
    }
    offset += dcCount;

    let rsPoly = createQrPolynomial([1], 0);
    for (let i = 0; i < ecCount; i++) {
      rsPoly = rsPoly.multiply(createQrPolynomial([1, qrGexp(i)], 0));
    }
    const rawPoly = createQrPolynomial(dcdata[r], rsPoly.getLength() - 1);
    const modPoly = rawPoly.mod(rsPoly);

    ecdata[r] = Array.from({ length: rsPoly.getLength() - 1 }, () => 0);
    for (let i = 0; i < ecdata[r].length; i++) {
      const modIdx = i + modPoly.getLength() - ecdata[r].length;
      ecdata[r][i] = modIdx >= 0 ? modPoly.getAt(modIdx) : 0;
    }
  }

  const codewords = [];
  for (let i = 0; i < maxDcCount; i++) {
    for (let r = 0; r < rsBlocks.length; r++) {
      if (i < dcdata[r].length) codewords.push(dcdata[r][i]);
    }
  }
  for (let i = 0; i < maxEcCount; i++) {
    for (let r = 0; r < rsBlocks.length; r++) {
      if (i < ecdata[r].length) codewords.push(ecdata[r][i]);
    }
  }

  const moduleCount = typeNumber * 4 + 17;

  const buildMatrix = (maskPattern) => {
    const modules = Array.from({ length: moduleCount }, () =>
      Array.from({ length: moduleCount }, () => null)
    );

    const placeFinder = (row, col) => {
      for (let r = -1; r <= 7; r++) {
        if (row + r < 0 || moduleCount <= row + r) continue;
        for (let c = -1; c <= 7; c++) {
          if (col + c < 0 || moduleCount <= col + c) continue;
          if (
            (0 <= r && r <= 6 && (c === 0 || c === 6)) ||
            (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
            (2 <= r && r <= 4 && 2 <= c && c <= 4)
          ) {
            modules[row + r][col + c] = true;
          } else {
            modules[row + r][col + c] = false;
          }
        }
      }
    };

    placeFinder(0, 0);
    placeFinder(moduleCount - 7, 0);
    placeFinder(0, moduleCount - 7);

    // Alignment patterns
    const pos = QR_PATTERN_POSITION_TABLE[typeNumber - 1] || [];
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        const row = pos[i];
        const col = pos[j];
        if (modules[row][col] !== null) continue;
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            modules[row + r][col + c] =
              r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0);
          }
        }
      }
    }

    // Timing patterns
    for (let r = 8; r < moduleCount - 8; r++) {
      if (modules[r][6] === null) modules[r][6] = r % 2 === 0;
    }
    for (let c = 8; c < moduleCount - 8; c++) {
      if (modules[6][c] === null) modules[6][c] = c % 2 === 0;
    }

    // Type info
    const typeInfoBits = getBCHTypeInfo((QR_EC_LEVEL_M << 3) | maskPattern);
    for (let i = 0; i < 15; i++) {
      const mod = ((typeInfoBits >> i) & 1) === 1;
      if (i < 6) modules[i][8] = mod;
      else if (i < 8) modules[i + 1][8] = mod;
      else modules[moduleCount - 15 + i][8] = mod;
    }
    for (let i = 0; i < 15; i++) {
      const mod = ((typeInfoBits >> i) & 1) === 1;
      if (i < 8) modules[8][moduleCount - i - 1] = mod;
      else if (i < 9) modules[8][15 - i] = mod;
      else modules[8][15 - i - 1] = mod;
    }
    modules[moduleCount - 8][8] = true;

    // Map data bits
    let inc = -1;
    let row = moduleCount - 1;
    let bitIdx = 7;
    let byteIdx = 0;
    const maskFunc = getMaskFunction(maskPattern);

    for (let col = moduleCount - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      while (true) {
        for (let c = 0; c < 2; c++) {
          if (modules[row][col - c] === null) {
            let dark = false;
            if (byteIdx < codewords.length) {
              dark = ((codewords[byteIdx] >>> bitIdx) & 1) === 1;
            }
            if (maskFunc(row, col - c)) dark = !dark;
            modules[row][col - c] = dark;
            bitIdx--;
            if (bitIdx === -1) {
              byteIdx++;
              bitIdx = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }

    return modules;
  };

  return buildMatrix(0);
}

/**
 * Generates a standards-compliant vector SVG QR Code
 * @param {string} text
 * @param {number} [size=160]
 * @returns {string} SVG string
 */
export function generateQRCode(text, size = 160) {
  if (!text) return '';

  const matrix = encodeQRMatrix(text);
  const count = matrix.length;
  const quietZone = 2;
  const totalModules = count + quietZone * 2;
  const cellSize = size / totalModules;

  let rects = '';
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (matrix[r][c]) {
        const x = ((c + quietZone) * cellSize).toFixed(2);
        const y = ((r + quietZone) * cellSize).toFixed(2);
        const w = (cellSize + 0.15).toFixed(2);
        rects += `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="#000000" />`;
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#ffffff" />
    ${rects}
  </svg>`;
}

/* ==========================================================================
   PURE-JS 1D BARCODE DECODER & LIVE CAMERA BARCODE / QR SCANNER
   ========================================================================== */

const CODE128_PATTERN_TO_INDEX = new Map(
  CODE128_PATTERNS.map((pattern, idx) => [pattern, idx])
);

/**
 * Decodes a binary string ('1's and '0's) of module bars/spaces as Code 128B or EAN-13.
 * @param {string} binaryStr
 * @returns {{ rawValue: string, format: string, barcodeType: 'ean13'|'code128' } | null}
 */
export function decodeBinary1D(binaryStr) {
  if (!binaryStr) return null;
  const trimmed = binaryStr.replace(/^0+|0+$/g, '');
  if (!trimmed) return null;

  // 1. Check EAN-13 (exact 95 modules: 3 start + 42 left + 5 center + 42 right + 3 stop)
  if (trimmed.length === 95 && trimmed.startsWith('101') && trimmed.endsWith('101') && trimmed.slice(45, 50) === '01010') {
    let parityStr = '';
    let leftDigits = '';
    for (let i = 0; i < 6; i++) {
      const seg = trimmed.slice(3 + i * 7, 3 + (i + 1) * 7);
      const lIdx = EAN_L.indexOf(seg);
      if (lIdx !== -1) {
        parityStr += 'L';
        leftDigits += String(lIdx);
      } else {
        const gIdx = EAN_G.indexOf(seg);
        if (gIdx !== -1) {
          parityStr += 'G';
          leftDigits += String(gIdx);
        } else {
          leftDigits = '';
          break;
        }
      }
    }
    const firstDigit = EAN_PARITY.indexOf(parityStr);
    if (firstDigit !== -1 && leftDigits.length === 6) {
      let rightDigits = '';
      for (let i = 0; i < 6; i++) {
        const seg = trimmed.slice(50 + i * 7, 50 + (i + 1) * 7);
        const rIdx = EAN_R.indexOf(seg);
        if (rIdx !== -1) {
          rightDigits += String(rIdx);
        } else {
          rightDigits = '';
          break;
        }
      }
      if (rightDigits.length === 6) {
        const full13 = `${firstDigit}${leftDigits}${rightDigits}`;
        return { rawValue: full13, format: 'ean_13', barcodeType: 'ean13' };
      }
    }
  }

  // 2. Check Code 128B (each symbol is 11 modules, stop + terminal is 13 or 15 modules)
  const stopLen = trimmed.endsWith('110001110101111')
    ? 15
    : trimmed.endsWith('1100011101011')
    ? 13
    : 0;
  if (stopLen > 0 && trimmed.length >= 22 + stopLen && (trimmed.length - stopLen) % 11 === 0) {
    const numSymbols = (trimmed.length - stopLen) / 11;
    const indices = [];
    for (let s = 0; s < numSymbols; s++) {
      const seg = trimmed.slice(s * 11, (s + 1) * 11);
      let pattern = '';
      let j = 0;
      while (j < seg.length) {
        let r = 1;
        while (j + r < seg.length && seg[j + r] === seg[j]) r++;
        pattern += String(r);
        j += r;
      }
      const idx = CODE128_PATTERN_TO_INDEX.get(pattern);
      if (idx === undefined) return null;
      indices.push(idx);
    }

    if (indices[0] === 104 && indices.length >= 2) {
      const checksumExpected = indices[indices.length - 1];
      let sum = indices[0];
      for (let i = 1; i < indices.length - 1; i++) {
        sum += indices[i] * i;
      }
      if (sum % 103 === checksumExpected) {
        let decoded = '';
        for (let i = 1; i < indices.length - 1; i++) {
          decoded += String.fromCharCode(indices[i] + 32);
        }
        return { rawValue: decoded, format: 'code_128', barcodeType: 'code128' };
      }
    }
  }

  return null;
}

/**
 * Decodes a 1D barcode from a horizontal scanline of ImageData pixels
 * @param {ImageData} imageData
 * @returns {{ rawValue: string, format: string, barcodeType: 'ean13'|'code128' } | null}
 */
export function decodeBarcodeFromImageData(imageData) {
  if (!imageData || !imageData.data || !imageData.width || !imageData.height) return null;
  const { data, width, height } = imageData;

  const rowFractions = [0.5, 0.4, 0.6, 0.3, 0.7];
  for (const frac of rowFractions) {
    const y = Math.floor(height * frac);
    const luma = new Float32Array(width);
    let minL = 255;
    let maxL = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const val = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
      luma[x] = val;
      if (val < minL) minL = val;
      if (val > maxL) maxL = val;
    }

    if (maxL - minL < 40) continue; // Low contrast row
    const threshold = (minL + maxL) / 2;

    // Extract pixel runs of black (1) and white (0)
    const runs = [];
    let firstX = -1;
    let lastX = -1;
    for (let x = 0; x < width; x++) {
      if (luma[x] < threshold) {
        if (firstX === -1) firstX = x;
        lastX = x;
      }
    }
    if (firstX === -1 || lastX - firstX < 30) continue;

    let curBit = 1;
    let curLen = 0;
    for (let x = firstX; x <= lastX; x++) {
      const bit = luma[x] < threshold ? 1 : 0;
      if (bit === curBit) {
        curLen++;
      } else {
        runs.push({ bit: curBit, len: curLen });
        curBit = bit;
        curLen = 1;
      }
    }
    if (curLen > 0) runs.push({ bit: curBit, len: curLen });
    if (runs.length < 18) continue;

    // Estimate single module width from minimum run lengths
    const sortedLens = runs.map((r) => r.len).sort((a, b) => a - b);
    const unitWidth = sortedLens[Math.floor(sortedLens.length * 0.15)] || 1;
    if (unitWidth <= 0) continue;

    let binary = '';
    for (const r of runs) {
      const modules = Math.max(1, Math.round(r.len / unitWidth));
      binary += (r.bit ? '1' : '0').repeat(modules);
    }

    const result = decodeBinary1D(binary);
    if (result) return result;
  }

  return null;
}

/**
 * Live Camera Barcode & QR Code Scanner Controller
 * Uses native BarcodeDetector API when available, plus pure-JS 1D scanline fallback.
 */
export class BarcodeScanner {
  #stream = null;
  #scanTimer = null;
  #facingMode = 'environment';
  #detector = null;
  #isScanning = false;

  constructor() {
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      try {
        // @ts-ignore
        this.#detector = new window.BarcodeDetector({
          formats: [
            'ean_13',
            'ean_8',
            'code_128',
            'code_39',
            'code_93',
            'codabar',
            'itf',
            'upc_a',
            'upc_e',
            'qr_code',
            'data_matrix',
            'pdf417',
            'aztec',
          ],
        });
      } catch {
        try {
          // @ts-ignore
          this.#detector = new window.BarcodeDetector();
        } catch {
          this.#detector = null;
        }
      }
    }
  }

  get isActive() {
    return this.#isScanning && !!this.#stream;
  }

  get facingMode() {
    return this.#facingMode;
  }

  /**
   * Normalizes a BarcodeDetector format string into Stow Cards barcodeType
   * @param {string} format
   * @param {string} rawValue
   * @returns {'qr'|'ean13'|'code128'}
   */
  static normalizeBarcodeType(format, rawValue = '') {
    const f = (format || '').toLowerCase();
    if (f.includes('qr') || f.includes('matrix') || f.includes('aztec') || f.includes('pdf417')) {
      return 'qr';
    }
    if (f.includes('ean') && /^\d{12,13}$/.test(rawValue.trim())) {
      return 'ean13';
    }
    return 'code128';
  }

  /**
   * Starts live camera video and begins scanning for barcodes and QR codes.
   * @param {HTMLVideoElement} videoEl
   * @param {HTMLCanvasElement} canvasEl
   * @param {(result: { rawValue: string, format: string, barcodeType: 'qr'|'ean13'|'code128' }) => void} onDetected
   * @returns {Promise<boolean>}
   */
  async start(videoEl, canvasEl, onDetected) {
    this.stop(videoEl);

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera API not available in this browser');
    }

    this.#stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: this.#facingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    });

    if (videoEl) {
      videoEl.srcObject = this.#stream;
      videoEl.style.display = 'block';
      try {
        await videoEl.play();
      } catch {
        // Ignore play() interruption in headless environments
      }
    }

    this.#isScanning = true;
    this.#scanTimer = setInterval(async () => {
      if (!this.#isScanning || !videoEl) return;
      const result = await this.scanFrame(videoEl, canvasEl);
      if (result && result.rawValue) {
        onDetected(result);
      }
    }, 180);

    return true;
  }

  /**
   * Switches between rear ('environment') and front ('user') camera
   * @param {HTMLVideoElement} videoEl
   * @param {HTMLCanvasElement} canvasEl
   * @param {(result: { rawValue: string, format: string, barcodeType: 'qr'|'ean13'|'code128' }) => void} onDetected
   */
  async switchCamera(videoEl, canvasEl, onDetected) {
    this.#facingMode = this.#facingMode === 'environment' ? 'user' : 'environment';
    if (this.isActive) {
      return this.start(videoEl, canvasEl, onDetected);
    }
    return false;
  }

  /**
   * Scans a single frame from a video or canvas element
   * @param {HTMLVideoElement|HTMLCanvasElement} sourceEl
   * @param {HTMLCanvasElement} [workCanvas]
   * @returns {Promise<{ rawValue: string, format: string, barcodeType: 'qr'|'ean13'|'code128' } | null>}
   */
  async scanFrame(sourceEl, workCanvas) {
    if (!sourceEl) return null;

    // 1. Native BarcodeDetector (handles both QR codes and 1D barcodes)
    if (this.#detector) {
      try {
        const barcodes = await this.#detector.detect(sourceEl);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          const hit = barcodes[0];
          return {
            rawValue: hit.rawValue.trim(),
            format: hit.format || 'unknown',
            barcodeType: BarcodeScanner.normalizeBarcodeType(hit.format, hit.rawValue),
          };
        }
      } catch {
        // Fall through to canvas scanline decoder
      }
    }

    // 2. Pure-JS 1D scanline decoder fallback via canvas
    const canvas = workCanvas || (sourceEl instanceof HTMLCanvasElement ? sourceEl : null);
    if (canvas) {
      try {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          if (sourceEl !== canvas) {
            const vw = /** @type {HTMLVideoElement} */ (sourceEl).videoWidth || canvas.width || 600;
            const vh = /** @type {HTMLVideoElement} */ (sourceEl).videoHeight || canvas.height || 300;
            if (vw > 0 && vh > 0) {
              canvas.width = vw;
              canvas.height = vh;
              ctx.drawImage(sourceEl, 0, 0, vw, vh);
            }
          }
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const decoded = decodeBarcodeFromImageData(imgData);
          if (decoded) return decoded;
        }
      } catch {
        // Ignore cross-origin or unready video frame errors
      }
    }

    return null;
  }

  /**
   * Stops active camera stream and detection loop
   * @param {HTMLVideoElement} [videoEl]
   */
  stop(videoEl) {
    this.#isScanning = false;
    if (this.#scanTimer) {
      clearInterval(this.#scanTimer);
      this.#scanTimer = null;
    }
    if (this.#stream) {
      this.#stream.getTracks().forEach((t) => t.stop());
      this.#stream = null;
    }
    if (videoEl) {
      videoEl.srcObject = null;
      videoEl.style.display = 'none';
    }
  }
}

/**
 * Formats card number with clean 4-digit spacing for cashier readback
 * @param {string} num
 * @returns {string}
 */
export function formatCardNumber(num) {
  if (!num) return '';
  return num.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Masks card number, displaying only the final 4 characters
 * @param {string} num
 * @returns {string}
 */
export function maskCardNumber(num) {
  if (!num || !num.trim()) return '•••• ••••';
  const clean = num.replace(/\s+/g, '');
  const last4 = clean.slice(-4);
  return `•••• ${last4}`;
}
