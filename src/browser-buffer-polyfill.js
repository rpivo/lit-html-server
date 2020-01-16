/* global globalThis, self, window */
// @ts-nocheck

const global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof window !== undefined && window);

export function polyfillBuffer() {
  global.Buffer =
    global.Buffer ||
    class Buffer {
      /**
       * Determine if 'buffer' is a buffer
       *
       * @param { any } buffer
       * @returns { boolean }
       */
      static isBuffer(buffer) {
        return buffer != null && typeof buffer === 'object' && buffer.string !== undefined;
      }

      /**
       * Create buffer from 'string'
       *
       * @param { string } string
       * @returns { string }
       */
      static from(string) {
        string = typeof string === 'string' ? string : String(string);
        return new Buffer(string);
      }

      /**
       * Join 'buffers' into a single string
       *
       * @param { Array<any> } buffers
       * @param { number } [length]
       * @returns { string }
       */
      static concat(buffers, length) {
        let string = '';

        for (let i = 0, n = buffers.length; i < n; i++) {
          const buffer = buffers[i];

          string += typeof buffer === 'string' ? buffer : String(buffer);
        }

        if (length !== undefined && string.length > length) {
          string = string.slice(0, length);
        }

        return new Buffer(string);
      }

      /**
       * Construct Buffer instance
       *
       * @param { string } string
       */
      constructor(string) {
        this.string = string;
      }

      /**
       * Stringify
       *
       * @returns { string }
       */
      toString() {
        return this.string;
      }
    };
}
