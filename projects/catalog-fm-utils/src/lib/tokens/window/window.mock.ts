export const MOCK_WINDOW = {
  location: {
    _href: 'http://href',
    _origin: 'http://origin',
    set href(url: string) {
      this._href = url;
    },
    get href() {
      return this._href;
    },
    set origin(url: string) {
      this._origin = url;
    },
    get origin() {
      return this._origin;
    },
  },
  navigator: {
    _onLine: true,
    set onLine(status: boolean) {
      this._onLine = status;
    },
    get onLine() {
      return this._onLine;
    },
  },
  addEventListener(event: string, listener: Function) {},
};
