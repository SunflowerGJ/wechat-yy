const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src';
// https://www.cnblogs.com/kaiye/p/9909304.html
const base64src = function(base64data) {
  return new Promise((resolve, reject) => {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      reject(new Error('ERROR_BASE64SRC_PARSE'));
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        resolve(filePath);
      },
      fail() {
        reject(new Error('ERROR_BASE64SRC_WRITE'));
      },
    });
  });
};

export default base64src;