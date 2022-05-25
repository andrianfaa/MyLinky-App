import crypto from "crypto";

const DEFAULT_LENGTH = 6; // default length of the random id

export const RandomID = {
  /**
   * Generate random ID
   *
   * @param length - Length of the ID
   * @returns Random ID
   * @example RandomID.generate() => "5b8f8f-f8f8f8-f8f8f8-f8f8f8-f8f8f8"
   */
  generate: (length: number = DEFAULT_LENGTH): string => {
    const randomChars1 = crypto
      .createHash("sha256")
      .update(crypto.randomBytes(256))
      .digest("hex")
      .slice(0, length);
    const randomChars2 = crypto
      .createHash("sha256")
      .update(crypto.randomBytes(256))
      .digest("hex")
      .slice(0, length);
    const randomChars3 = crypto
      .createHash("sha256")
      .update(crypto.randomBytes(256))
      .digest("hex")
      .slice(0, length);
    const randomChars4 = crypto
      .createHash("sha256")
      .update(crypto.randomBytes(256))
      .digest("hex")
      .slice(0, length);
    const randomChars5 = crypto
      .createHash("sha256")
      .update(crypto.randomBytes(256))
      .digest("hex")
      .slice(0, length);

    return [
      randomChars1,
      randomChars2,
      randomChars3,
      randomChars4,
      randomChars5,
    ]
      .join("-")
      .toString();
  },

  /**
   * Generate random ID with prefix
   *
   * @param prefix - Prefix of the ID
   * @param length - Length of the ID
   * @returns Random ID
   * @example RandomID.generate("prefix", 6) => "prefix-5b8f8f-f8f8f8-f8f8f8-f8f8f8-f8f8f8"
   */
  generateWithPrefix: (
    prefix: string,
    length: number = DEFAULT_LENGTH,
  ): string => {
    const randomChars = RandomID.generate(length);

    return `${prefix}-${randomChars}`;
  },

  /**
   * Generate random ID with suffix
   *
   * @param suffix - Suffix of the ID
   * @param length - Length of the ID
   * @returns Random ID
   * @example RandomID.generate("suffix", 6) => "5b8f8f-f8f8f8-f8f8f8-f8f8f8-f8f8f8-suffix"
   */
  generateWithSuffix: (
    suffix: string,
    length: number = DEFAULT_LENGTH,
  ): string => {
    const randomChars = RandomID.generate(length);

    return `${randomChars}-${suffix}`;
  },

  /**
   * Generate random ID with prefix and suffix
   *
   * @param prefix - Prefix of the ID
   * @param suffix - Suffix of the ID
   * @param length - Length of the ID
   * @returns Random ID
   * @example RandomID.generate("prefix", "suffix", 6) => "prefix-5b8f8f-f8f8f8-f8f8f8-f8f8f8-f8f8f8-suffix"
   */
  generateWithPrefixAndSuffix: (
    prefix: string,
    suffix: string,
    length: number = DEFAULT_LENGTH,
  ): string => {
    const randomChars = RandomID.generate(length);

    return `${prefix}-${randomChars}-${suffix}`;
  },
};
