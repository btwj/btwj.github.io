
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', '.git', true, true);
Module['FS_createPath']('/.git', 'hooks', true, true);
Module['FS_createPath']('/.git', 'info', true, true);
Module['FS_createPath']('/.git', 'logs', true, true);
Module['FS_createPath']('/.git/logs', 'refs', true, true);
Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git', 'objects', true, true);
Module['FS_createPath']('/.git/objects', '01', true, true);
Module['FS_createPath']('/.git/objects', '0a', true, true);
Module['FS_createPath']('/.git/objects', '17', true, true);
Module['FS_createPath']('/.git/objects', '19', true, true);
Module['FS_createPath']('/.git/objects', '1a', true, true);
Module['FS_createPath']('/.git/objects', '1d', true, true);
Module['FS_createPath']('/.git/objects', '1f', true, true);
Module['FS_createPath']('/.git/objects', '28', true, true);
Module['FS_createPath']('/.git/objects', '2a', true, true);
Module['FS_createPath']('/.git/objects', '2b', true, true);
Module['FS_createPath']('/.git/objects', '2c', true, true);
Module['FS_createPath']('/.git/objects', '2e', true, true);
Module['FS_createPath']('/.git/objects', '35', true, true);
Module['FS_createPath']('/.git/objects', '39', true, true);
Module['FS_createPath']('/.git/objects', '3c', true, true);
Module['FS_createPath']('/.git/objects', '3e', true, true);
Module['FS_createPath']('/.git/objects', '49', true, true);
Module['FS_createPath']('/.git/objects', '4a', true, true);
Module['FS_createPath']('/.git/objects', '4b', true, true);
Module['FS_createPath']('/.git/objects', '4c', true, true);
Module['FS_createPath']('/.git/objects', '4e', true, true);
Module['FS_createPath']('/.git/objects', '50', true, true);
Module['FS_createPath']('/.git/objects', '52', true, true);
Module['FS_createPath']('/.git/objects', '54', true, true);
Module['FS_createPath']('/.git/objects', '56', true, true);
Module['FS_createPath']('/.git/objects', '58', true, true);
Module['FS_createPath']('/.git/objects', '60', true, true);
Module['FS_createPath']('/.git/objects', '66', true, true);
Module['FS_createPath']('/.git/objects', '69', true, true);
Module['FS_createPath']('/.git/objects', '75', true, true);
Module['FS_createPath']('/.git/objects', '76', true, true);
Module['FS_createPath']('/.git/objects', '78', true, true);
Module['FS_createPath']('/.git/objects', '80', true, true);
Module['FS_createPath']('/.git/objects', '85', true, true);
Module['FS_createPath']('/.git/objects', '89', true, true);
Module['FS_createPath']('/.git/objects', '8d', true, true);
Module['FS_createPath']('/.git/objects', '8f', true, true);
Module['FS_createPath']('/.git/objects', '95', true, true);
Module['FS_createPath']('/.git/objects', 'a0', true, true);
Module['FS_createPath']('/.git/objects', 'a3', true, true);
Module['FS_createPath']('/.git/objects', 'a7', true, true);
Module['FS_createPath']('/.git/objects', 'a8', true, true);
Module['FS_createPath']('/.git/objects', 'b0', true, true);
Module['FS_createPath']('/.git/objects', 'b1', true, true);
Module['FS_createPath']('/.git/objects', 'b4', true, true);
Module['FS_createPath']('/.git/objects', 'b8', true, true);
Module['FS_createPath']('/.git/objects', 'c6', true, true);
Module['FS_createPath']('/.git/objects', 'c7', true, true);
Module['FS_createPath']('/.git/objects', 'c8', true, true);
Module['FS_createPath']('/.git/objects', 'c9', true, true);
Module['FS_createPath']('/.git/objects', 'd3', true, true);
Module['FS_createPath']('/.git/objects', 'db', true, true);
Module['FS_createPath']('/.git/objects', 'dc', true, true);
Module['FS_createPath']('/.git/objects', 'df', true, true);
Module['FS_createPath']('/.git/objects', 'e4', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', 'e7', true, true);
Module['FS_createPath']('/.git/objects', 'ed', true, true);
Module['FS_createPath']('/.git/objects', 'f7', true, true);
Module['FS_createPath']('/.git/objects', 'f9', true, true);
Module['FS_createPath']('/.git/objects', 'fa', true, true);
Module['FS_createPath']('/.git/objects', 'fb', true, true);
Module['FS_createPath']('/.git/objects', 'fe', true, true);
Module['FS_createPath']('/.git/objects', 'ff', true, true);
Module['FS_createPath']('/.git', 'refs', true, true);
Module['FS_createPath']('/.git/refs', 'heads', true, true);
Module['FS_createPath']('/.git/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/', 'fonts', true, true);
Module['FS_createPath']('/', 'img', true, true);
Module['FS_createPath']('/img', 'characters', true, true);
Module['FS_createPath']('/img', 'ui', true, true);
Module['FS_createPath']('/', 'sounds', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 0, "filename": "/.gitignore"}, {"audio": 0, "start": 0, "crunched": 0, "end": 4090, "filename": "/character.lua"}, {"audio": 0, "start": 4090, "crunched": 0, "end": 4215, "filename": "/conf.lua"}, {"audio": 0, "start": 4215, "crunched": 0, "end": 6643, "filename": "/const.lua"}, {"audio": 0, "start": 6643, "crunched": 0, "end": 7736, "filename": "/cutscene.lua"}, {"audio": 0, "start": 7736, "crunched": 0, "end": 15651, "filename": "/level.lua"}, {"audio": 0, "start": 15651, "crunched": 0, "end": 18994, "filename": "/main.lua"}, {"audio": 0, "start": 18994, "crunched": 0, "end": 19253, "filename": "/README.md"}, {"audio": 0, "start": 19253, "crunched": 0, "end": 21350, "filename": "/stage.lua"}, {"audio": 0, "start": 21350, "crunched": 0, "end": 21362, "filename": "/.git/COMMIT_EDITMSG"}, {"audio": 0, "start": 21362, "crunched": 0, "end": 21664, "filename": "/.git/config"}, {"audio": 0, "start": 21664, "crunched": 0, "end": 21737, "filename": "/.git/description"}, {"audio": 0, "start": 21737, "crunched": 0, "end": 21827, "filename": "/.git/FETCH_HEAD"}, {"audio": 0, "start": 21827, "crunched": 0, "end": 21850, "filename": "/.git/HEAD"}, {"audio": 0, "start": 21850, "crunched": 0, "end": 25330, "filename": "/.git/index"}, {"audio": 0, "start": 25330, "crunched": 0, "end": 25371, "filename": "/.git/ORIG_HEAD"}, {"audio": 0, "start": 25371, "crunched": 0, "end": 25478, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 25478, "crunched": 0, "end": 25930, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 25930, "crunched": 0, "end": 26826, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 26826, "crunched": 0, "end": 27015, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 27015, "crunched": 0, "end": 27413, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 27413, "crunched": 0, "end": 29055, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 29055, "crunched": 0, "end": 30403, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 30403, "crunched": 0, "end": 35354, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 35354, "crunched": 0, "end": 36593, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 36593, "crunched": 0, "end": 40204, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 40204, "crunched": 0, "end": 40444, "filename": "/.git/info/exclude"}, {"audio": 0, "start": 40444, "crunched": 0, "end": 41393, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 41393, "crunched": 0, "end": 42342, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 42342, "crunched": 0, "end": 42516, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 42516, "crunched": 0, "end": 43291, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 43291, "crunched": 0, "end": 43683, "filename": "/.git/objects/01/c66422c2c3faab4f634042b16fd8853a474a72"}, {"audio": 0, "start": 43683, "crunched": 0, "end": 44075, "filename": "/.git/objects/0a/5f43ae5856fda3ed7ccb95d003ba505dd3f8d4"}, {"audio": 0, "start": 44075, "crunched": 0, "end": 44166, "filename": "/.git/objects/0a/eccd465eb731e70edaacd23e462bcd0bf5a530"}, {"audio": 0, "start": 44166, "crunched": 0, "end": 48113, "filename": "/.git/objects/17/1078a72d62a1cee64e8f56d463cb4b919dd6ad"}, {"audio": 0, "start": 48113, "crunched": 0, "end": 48918, "filename": "/.git/objects/17/1ad7c45c789174ce813c32da111d62b95f56d0"}, {"audio": 0, "start": 48918, "crunched": 0, "end": 49041, "filename": "/.git/objects/19/ee46a67efa6719fe7c93796aa747d41d7d5d4f"}, {"audio": 0, "start": 49041, "crunched": 0, "end": 49368, "filename": "/.git/objects/1a/52bd06719f7ac3fe77f0295a702650f94ff5f5"}, {"audio": 0, "start": 49368, "crunched": 0, "end": 50581, "filename": "/.git/objects/1d/3e08e286d15687ec4ddd8d22f0fc5b44b26857"}, {"audio": 0, "start": 50581, "crunched": 0, "end": 52804, "filename": "/.git/objects/1d/be584173442a98cc102ad9b2bc96e8b38d054a"}, {"audio": 0, "start": 52804, "crunched": 0, "end": 53409, "filename": "/.git/objects/1f/158184b68a6a57a697e8b4ee072229f6a8b2ca"}, {"audio": 0, "start": 53409, "crunched": 0, "end": 53572, "filename": "/.git/objects/28/75b578851c58a5ed7db06cfb29a2bd57738657"}, {"audio": 0, "start": 53572, "crunched": 0, "end": 53881, "filename": "/.git/objects/2a/70859a0d3992f80312a70e8da2eda10e5afbe4"}, {"audio": 0, "start": 53881, "crunched": 0, "end": 54117, "filename": "/.git/objects/2a/89d6a16e7576f963c0fc14f9b92786d1f8d71b"}, {"audio": 0, "start": 54117, "crunched": 0, "end": 54234, "filename": "/.git/objects/2b/351faf8ef721a793d3d630224e76a391ceeab8"}, {"audio": 0, "start": 54234, "crunched": 0, "end": 63181, "filename": "/.git/objects/2c/15ba3ec2a3a681c7779077d3699e03340e5fc4"}, {"audio": 0, "start": 63181, "crunched": 0, "end": 65825, "filename": "/.git/objects/2c/7ae018b3c4fa4f88ed259ebca81b9fdbee39a2"}, {"audio": 0, "start": 65825, "crunched": 0, "end": 66371, "filename": "/.git/objects/2e/51dc073ec9112d67f6a9853511377d077a0b92"}, {"audio": 0, "start": 66371, "crunched": 0, "end": 66544, "filename": "/.git/objects/35/2cb141d8fde4279fbf573f8bc082d5bd698296"}, {"audio": 0, "start": 66544, "crunched": 0, "end": 67914, "filename": "/.git/objects/39/7f7d0cba2817ee469b37960bbc47ac74007498"}, {"audio": 0, "start": 67914, "crunched": 0, "end": 70228, "filename": "/.git/objects/3c/f68750bc6891a173166cddebeb0ff8147eb663"}, {"audio": 0, "start": 70228, "crunched": 0, "end": 70552, "filename": "/.git/objects/3e/ce3af5674948da854e974a3d2ec45beadc0a11"}, {"audio": 0, "start": 70552, "crunched": 0, "end": 70882, "filename": "/.git/objects/49/5006784561074cc990ae96fd1118fd1339dda6"}, {"audio": 0, "start": 70882, "crunched": 0, "end": 71512, "filename": "/.git/objects/4a/143db5ed2acc9cc75b1d99ec90088bff66237a"}, {"audio": 0, "start": 71512, "crunched": 0, "end": 73861, "filename": "/.git/objects/4b/4f7a4a7e26ec442c85e2ad2de1abecc22ab83e"}, {"audio": 0, "start": 73861, "crunched": 0, "end": 73977, "filename": "/.git/objects/4b/a17b7fd0df9e7d5e05643fcfacec248baab1a1"}, {"audio": 0, "start": 73977, "crunched": 0, "end": 74369, "filename": "/.git/objects/4c/50931c70ecf179ef64329d1f40e9f09d7e5bdf"}, {"audio": 0, "start": 74369, "crunched": 0, "end": 75564, "filename": "/.git/objects/4e/2f002d25ad22e66b673c9c1e028ae5c9a35b4c"}, {"audio": 0, "start": 75564, "crunched": 0, "end": 75928, "filename": "/.git/objects/50/8ee9a25463b4792f066653402f1c42c85f8e09"}, {"audio": 0, "start": 75928, "crunched": 0, "end": 76569, "filename": "/.git/objects/52/7b5003485c3ae0e7b6a0f5835c368584813b62"}, {"audio": 0, "start": 76569, "crunched": 0, "end": 76785, "filename": "/.git/objects/54/57c843ebff598261b2be02b3218ec6f7154c09"}, {"audio": 0, "start": 76785, "crunched": 0, "end": 76941, "filename": "/.git/objects/56/e4f5b518119510f3c1475c2f8e9b8987899e55"}, {"audio": 0, "start": 76941, "crunched": 0, "end": 87056, "filename": "/.git/objects/58/40171e37402a8dd522c9b2ea1ef65a397979ee"}, {"audio": 0, "start": 87056, "crunched": 0, "end": 87222, "filename": "/.git/objects/60/39943f9186338eb1ed6409257b0109f9627070"}, {"audio": 0, "start": 87222, "crunched": 0, "end": 88203, "filename": "/.git/objects/66/a59e4601dd4e89b0cd4f1c9228e85e269bbc1f"}, {"audio": 0, "start": 88203, "crunched": 0, "end": 98811, "filename": "/.git/objects/69/9f2b87589ad13b390e31fd09cd77b80e9c0ad1"}, {"audio": 0, "start": 98811, "crunched": 0, "end": 98976, "filename": "/.git/objects/75/d94c7f150111fe37efed2e6f0deda5c0f81915"}, {"audio": 0, "start": 98976, "crunched": 0, "end": 100195, "filename": "/.git/objects/76/490c5ee5ea533ad0471cdabcfbca41e7cb3396"}, {"audio": 0, "start": 100195, "crunched": 0, "end": 100358, "filename": "/.git/objects/78/54b2265acd1cdd36ce83dd653d7502ec990213"}, {"audio": 0, "start": 100358, "crunched": 0, "end": 101740, "filename": "/.git/objects/80/11c10816fa2f42d123ec529cde5c2a8da3fdee"}, {"audio": 0, "start": 101740, "crunched": 0, "end": 102268, "filename": "/.git/objects/85/976f6723e90d74b87ffd7037cd49a7772837d4"}, {"audio": 0, "start": 102268, "crunched": 0, "end": 102802, "filename": "/.git/objects/89/434afacedb505dfcc9587bc91984bd26009dfc"}, {"audio": 0, "start": 102802, "crunched": 0, "end": 103315, "filename": "/.git/objects/8d/2c49d931ee58fff01c0ebcbb1867674ddc3666"}, {"audio": 0, "start": 103315, "crunched": 0, "end": 104700, "filename": "/.git/objects/8f/e89e85682a45b24aa418c9b1ae0a4beab65f19"}, {"audio": 0, "start": 104700, "crunched": 0, "end": 104831, "filename": "/.git/objects/95/b5ed3549d016902783ad717edda98fe020b9ca"}, {"audio": 0, "start": 104831, "crunched": 0, "end": 105276, "filename": "/.git/objects/a0/4427c70a1047cb80cb8bb231bb0e6e9d6cff4e"}, {"audio": 0, "start": 105276, "crunched": 0, "end": 106556, "filename": "/.git/objects/a3/54c9943309635d75c5995879d71406b1a717f4"}, {"audio": 0, "start": 106556, "crunched": 0, "end": 107171, "filename": "/.git/objects/a7/4e855a0e1d70377c46c377d4ee0f30349de442"}, {"audio": 0, "start": 107171, "crunched": 0, "end": 107249, "filename": "/.git/objects/a8/17b884bf722c1ad8ee9b70993b75466ef8980a"}, {"audio": 0, "start": 107249, "crunched": 0, "end": 107824, "filename": "/.git/objects/b0/1894c33a86a9abca65a9e3da03577f01c21461"}, {"audio": 0, "start": 107824, "crunched": 0, "end": 153510, "filename": "/.git/objects/b1/9aa7b9d5a928d08642b76c36b30160389af29c"}, {"audio": 0, "start": 153510, "crunched": 0, "end": 154041, "filename": "/.git/objects/b4/34848cdede0692e6f34992482e123ff4424368"}, {"audio": 0, "start": 154041, "crunched": 0, "end": 154131, "filename": "/.git/objects/b8/dbf5237bf2175f96be2cb54f1faf290691620e"}, {"audio": 0, "start": 154131, "crunched": 0, "end": 154551, "filename": "/.git/objects/c6/bbbc3bab752c04703a30bc939f4210dac433ca"}, {"audio": 0, "start": 154551, "crunched": 0, "end": 154760, "filename": "/.git/objects/c7/b594bd2dd3ddfa2f84e9cf0e0fccb12c844e97"}, {"audio": 0, "start": 154760, "crunched": 0, "end": 157276, "filename": "/.git/objects/c8/1a43cdf1a77a4c431d11b8c9d468d498b6ceb7"}, {"audio": 0, "start": 157276, "crunched": 0, "end": 157639, "filename": "/.git/objects/c9/974ec046cc14e63e8119b2b4b67208733bfce8"}, {"audio": 0, "start": 157639, "crunched": 0, "end": 158064, "filename": "/.git/objects/d3/b7cc8a5331112d06b0667a45034d003a09d6b0"}, {"audio": 0, "start": 158064, "crunched": 0, "end": 160407, "filename": "/.git/objects/db/0a58af514a199d75f6fc992e054f523f6d3e45"}, {"audio": 0, "start": 160407, "crunched": 0, "end": 160771, "filename": "/.git/objects/dc/e23b993a893e97edbe7689abd6c9671a9e76e5"}, {"audio": 0, "start": 160771, "crunched": 0, "end": 241324, "filename": "/.git/objects/df/80c85aea0baade82ad55463bf4e5c31a196a4b"}, {"audio": 0, "start": 241324, "crunched": 0, "end": 241823, "filename": "/.git/objects/e4/e0948719f767fa0e7bac9569994471373d2322"}, {"audio": 0, "start": 241823, "crunched": 0, "end": 243735, "filename": "/.git/objects/e4/e45bf2fb60b3943e2af13ba1273d2c362ea998"}, {"audio": 0, "start": 243735, "crunched": 0, "end": 244098, "filename": "/.git/objects/e6/4090c6c18980790d9b43cc5d02b6c2f6f8c88a"}, {"audio": 0, "start": 244098, "crunched": 0, "end": 244113, "filename": "/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391"}, {"audio": 0, "start": 244113, "crunched": 0, "end": 246627, "filename": "/.git/objects/e6/e820d347b6a07af71de853a70e237969e5a3c4"}, {"audio": 0, "start": 246627, "crunched": 0, "end": 247135, "filename": "/.git/objects/e7/198ab0391044bc11eac3172c9b34bf26526b73"}, {"audio": 0, "start": 247135, "crunched": 0, "end": 247635, "filename": "/.git/objects/ed/f5268d0d3ec396acfdc3442c65fe939071104c"}, {"audio": 0, "start": 247635, "crunched": 0, "end": 247795, "filename": "/.git/objects/f7/a00a25f9ed678b42d9699fcc872f8bd9f91c6a"}, {"audio": 0, "start": 247795, "crunched": 0, "end": 248590, "filename": "/.git/objects/f9/9ef27e2bc73161e841ab511993b0bc0406e7ba"}, {"audio": 0, "start": 248590, "crunched": 0, "end": 252993, "filename": "/.git/objects/fa/e77ef83769d220da2e1585ef9ed43a751fdd48"}, {"audio": 0, "start": 252993, "crunched": 0, "end": 253154, "filename": "/.git/objects/fb/26a202b1ba57b9b6c6b7da9a126fc9795fc6df"}, {"audio": 0, "start": 253154, "crunched": 0, "end": 253473, "filename": "/.git/objects/fe/43b93ec1474b18bb2b203fb9dc11aad62a2a5d"}, {"audio": 0, "start": 253473, "crunched": 0, "end": 253663, "filename": "/.git/objects/ff/7e66a4da09e15cd937d23ae3ccb227b2e17778"}, {"audio": 0, "start": 253663, "crunched": 0, "end": 253704, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 253704, "crunched": 0, "end": 253736, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 253736, "crunched": 0, "end": 253777, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 253777, "crunched": 0, "end": 281945, "filename": "/fonts/Munro.ttf"}, {"audio": 0, "start": 281945, "crunched": 0, "end": 309629, "filename": "/fonts/MunroNarrow.ttf"}, {"audio": 0, "start": 309629, "crunched": 0, "end": 336929, "filename": "/fonts/MunroSmall.ttf"}, {"audio": 0, "start": 336929, "crunched": 0, "end": 337437, "filename": "/img/characters/barackobama.png"}, {"audio": 0, "start": 337437, "crunched": 0, "end": 337951, "filename": "/img/characters/billclinton.png"}, {"audio": 0, "start": 337951, "crunched": 0, "end": 338462, "filename": "/img/characters/davidcameron.png"}, {"audio": 0, "start": 338462, "crunched": 0, "end": 338988, "filename": "/img/characters/hillaryclinton.png"}, {"audio": 0, "start": 338988, "crunched": 0, "end": 339476, "filename": "/img/characters/lizardperson.png"}, {"audio": 0, "start": 339476, "crunched": 0, "end": 340086, "filename": "/img/characters/queenelizabeth.png"}, {"audio": 0, "start": 340086, "crunched": 0, "end": 340641, "filename": "/img/characters/queensguard.png"}, {"audio": 0, "start": 340641, "crunched": 0, "end": 341134, "filename": "/img/characters/secretagent.png"}, {"audio": 0, "start": 341134, "crunched": 0, "end": 341614, "filename": "/img/characters/secretagent2.png"}, {"audio": 0, "start": 341614, "crunched": 0, "end": 344893, "filename": "/img/ui/background.png"}, {"audio": 0, "start": 344893, "crunched": 0, "end": 345488, "filename": "/img/ui/btn_capture.png"}, {"audio": 0, "start": 345488, "crunched": 0, "end": 346073, "filename": "/img/ui/btn_capture_hover.png"}, {"audio": 0, "start": 346073, "crunched": 0, "end": 346377, "filename": "/img/ui/btn_place_marker.png"}, {"audio": 0, "start": 346377, "crunched": 0, "end": 346676, "filename": "/img/ui/btn_place_marker_hover.png"}, {"audio": 0, "start": 346676, "crunched": 0, "end": 347081, "filename": "/img/ui/btn_vis.png"}, {"audio": 0, "start": 347081, "crunched": 0, "end": 347481, "filename": "/img/ui/btn_vis_toggle.png"}, {"audio": 0, "start": 347481, "crunched": 0, "end": 347778, "filename": "/img/ui/bubble.png"}, {"audio": 0, "start": 347778, "crunched": 0, "end": 350131, "filename": "/img/ui/gameover.png"}, {"audio": 0, "start": 350131, "crunched": 0, "end": 352415, "filename": "/img/ui/gamewin.png"}, {"audio": 0, "start": 352415, "crunched": 0, "end": 352526, "filename": "/img/ui/marker_0.png"}, {"audio": 0, "start": 352526, "crunched": 0, "end": 352719, "filename": "/img/ui/marker_1.png"}, {"audio": 0, "start": 352719, "crunched": 0, "end": 352893, "filename": "/img/ui/marker_2.png"}, {"audio": 0, "start": 352893, "crunched": 0, "end": 353112, "filename": "/img/ui/particle.png"}, {"audio": 1, "start": 353112, "crunched": 0, "end": 363662, "filename": "/sounds/beep.wav"}, {"audio": 1, "start": 363662, "crunched": 0, "end": 374212, "filename": "/sounds/beep2.wav"}, {"audio": 1, "start": 374212, "crunched": 0, "end": 386948, "filename": "/sounds/hit.wav"}, {"audio": 1, "start": 386948, "crunched": 0, "end": 443292, "filename": "/sounds/switch.wav"}, {"audio": 1, "start": 443292, "crunched": 0, "end": 561990, "filename": "/sounds/transform.wav"}], "remote_package_size": 561990, "package_uuid": "6720f973-4af9-4c41-a328-75b1c88d41f9"});

})();
