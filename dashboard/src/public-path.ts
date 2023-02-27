(function () {
  if ((window as any).__POWERED_BY_QIANKUN__) {
    if (process.env.NODE_ENV === "development") {
      __webpack_public_path__ = `//localhost:${process.env.VUE_APP_Dashboard_PORT}${process.env.BASE_URL}`;
      return;
    }
    __webpack_public_path__ = (window as any)
      .__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
    // __webpack_public_path__ = `${process.env.BASE_URL}/`
  }
})();
