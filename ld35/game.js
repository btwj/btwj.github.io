
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
Module['FS_createPath']('/.git/objects', '3c', true, true);
Module['FS_createPath']('/.git/objects', '3e', true, true);
Module['FS_createPath']('/.git/objects', '49', true, true);
Module['FS_createPath']('/.git/objects', '4a', true, true);
Module['FS_createPath']('/.git/objects', '4b', true, true);
Module['FS_createPath']('/.git/objects', '4e', true, true);
Module['FS_createPath']('/.git/objects', '50', true, true);
Module['FS_createPath']('/.git/objects', '52', true, true);
Module['FS_createPath']('/.git/objects', '54', true, true);
Module['FS_createPath']('/.git/objects', '58', true, true);
Module['FS_createPath']('/.git/objects', '60', true, true);
Module['FS_createPath']('/.git/objects', '69', true, true);
Module['FS_createPath']('/.git/objects', '75', true, true);
Module['FS_createPath']('/.git/objects', '76', true, true);
Module['FS_createPath']('/.git/objects', '85', true, true);
Module['FS_createPath']('/.git/objects', '89', true, true);
Module['FS_createPath']('/.git/objects', '8d', true, true);
Module['FS_createPath']('/.git/objects', '95', true, true);
Module['FS_createPath']('/.git/objects', 'a0', true, true);
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
Module['FS_createPath']('/.git/objects', 'dc', true, true);
Module['FS_createPath']('/.git/objects', 'df', true, true);
Module['FS_createPath']('/.git/objects', 'e4', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', 'e7', true, true);
Module['FS_createPath']('/.git/objects', 'ed', true, true);
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 0, "filename": "/.gitignore"}, {"audio": 0, "start": 0, "crunched": 0, "end": 5327, "filename": "/character.lua"}, {"audio": 0, "start": 5327, "crunched": 0, "end": 5452, "filename": "/conf.lua"}, {"audio": 0, "start": 5452, "crunched": 0, "end": 6545, "filename": "/cutscene.lua"}, {"audio": 0, "start": 6545, "crunched": 0, "end": 15356, "filename": "/level.lua"}, {"audio": 0, "start": 15356, "crunched": 0, "end": 18592, "filename": "/main.lua"}, {"audio": 0, "start": 18592, "crunched": 0, "end": 18851, "filename": "/README.md"}, {"audio": 0, "start": 18851, "crunched": 0, "end": 20950, "filename": "/stage.lua"}, {"audio": 0, "start": 20950, "crunched": 0, "end": 21252, "filename": "/.git/config"}, {"audio": 0, "start": 21252, "crunched": 0, "end": 21325, "filename": "/.git/description"}, {"audio": 0, "start": 21325, "crunched": 0, "end": 21415, "filename": "/.git/FETCH_HEAD"}, {"audio": 0, "start": 21415, "crunched": 0, "end": 21438, "filename": "/.git/HEAD"}, {"audio": 0, "start": 21438, "crunched": 0, "end": 24846, "filename": "/.git/index"}, {"audio": 0, "start": 24846, "crunched": 0, "end": 24887, "filename": "/.git/ORIG_HEAD"}, {"audio": 0, "start": 24887, "crunched": 0, "end": 24994, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 24994, "crunched": 0, "end": 25446, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 25446, "crunched": 0, "end": 26342, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 26342, "crunched": 0, "end": 26531, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 26531, "crunched": 0, "end": 26929, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 26929, "crunched": 0, "end": 28571, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 28571, "crunched": 0, "end": 29919, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 29919, "crunched": 0, "end": 34870, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 34870, "crunched": 0, "end": 36109, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 36109, "crunched": 0, "end": 39720, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 39720, "crunched": 0, "end": 39960, "filename": "/.git/info/exclude"}, {"audio": 0, "start": 39960, "crunched": 0, "end": 40444, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 40444, "crunched": 0, "end": 40928, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 40928, "crunched": 0, "end": 41102, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 41102, "crunched": 0, "end": 41412, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 41412, "crunched": 0, "end": 41503, "filename": "/.git/objects/0a/eccd465eb731e70edaacd23e462bcd0bf5a530"}, {"audio": 0, "start": 41503, "crunched": 0, "end": 45450, "filename": "/.git/objects/17/1078a72d62a1cee64e8f56d463cb4b919dd6ad"}, {"audio": 0, "start": 45450, "crunched": 0, "end": 46255, "filename": "/.git/objects/17/1ad7c45c789174ce813c32da111d62b95f56d0"}, {"audio": 0, "start": 46255, "crunched": 0, "end": 46378, "filename": "/.git/objects/19/ee46a67efa6719fe7c93796aa747d41d7d5d4f"}, {"audio": 0, "start": 46378, "crunched": 0, "end": 46705, "filename": "/.git/objects/1a/52bd06719f7ac3fe77f0295a702650f94ff5f5"}, {"audio": 0, "start": 46705, "crunched": 0, "end": 47918, "filename": "/.git/objects/1d/3e08e286d15687ec4ddd8d22f0fc5b44b26857"}, {"audio": 0, "start": 47918, "crunched": 0, "end": 50141, "filename": "/.git/objects/1d/be584173442a98cc102ad9b2bc96e8b38d054a"}, {"audio": 0, "start": 50141, "crunched": 0, "end": 50746, "filename": "/.git/objects/1f/158184b68a6a57a697e8b4ee072229f6a8b2ca"}, {"audio": 0, "start": 50746, "crunched": 0, "end": 50909, "filename": "/.git/objects/28/75b578851c58a5ed7db06cfb29a2bd57738657"}, {"audio": 0, "start": 50909, "crunched": 0, "end": 51218, "filename": "/.git/objects/2a/70859a0d3992f80312a70e8da2eda10e5afbe4"}, {"audio": 0, "start": 51218, "crunched": 0, "end": 51454, "filename": "/.git/objects/2a/89d6a16e7576f963c0fc14f9b92786d1f8d71b"}, {"audio": 0, "start": 51454, "crunched": 0, "end": 51571, "filename": "/.git/objects/2b/351faf8ef721a793d3d630224e76a391ceeab8"}, {"audio": 0, "start": 51571, "crunched": 0, "end": 60518, "filename": "/.git/objects/2c/15ba3ec2a3a681c7779077d3699e03340e5fc4"}, {"audio": 0, "start": 60518, "crunched": 0, "end": 63162, "filename": "/.git/objects/2c/7ae018b3c4fa4f88ed259ebca81b9fdbee39a2"}, {"audio": 0, "start": 63162, "crunched": 0, "end": 63708, "filename": "/.git/objects/2e/51dc073ec9112d67f6a9853511377d077a0b92"}, {"audio": 0, "start": 63708, "crunched": 0, "end": 63881, "filename": "/.git/objects/35/2cb141d8fde4279fbf573f8bc082d5bd698296"}, {"audio": 0, "start": 63881, "crunched": 0, "end": 66195, "filename": "/.git/objects/3c/f68750bc6891a173166cddebeb0ff8147eb663"}, {"audio": 0, "start": 66195, "crunched": 0, "end": 66519, "filename": "/.git/objects/3e/ce3af5674948da854e974a3d2ec45beadc0a11"}, {"audio": 0, "start": 66519, "crunched": 0, "end": 66849, "filename": "/.git/objects/49/5006784561074cc990ae96fd1118fd1339dda6"}, {"audio": 0, "start": 66849, "crunched": 0, "end": 67479, "filename": "/.git/objects/4a/143db5ed2acc9cc75b1d99ec90088bff66237a"}, {"audio": 0, "start": 67479, "crunched": 0, "end": 67595, "filename": "/.git/objects/4b/a17b7fd0df9e7d5e05643fcfacec248baab1a1"}, {"audio": 0, "start": 67595, "crunched": 0, "end": 68790, "filename": "/.git/objects/4e/2f002d25ad22e66b673c9c1e028ae5c9a35b4c"}, {"audio": 0, "start": 68790, "crunched": 0, "end": 69154, "filename": "/.git/objects/50/8ee9a25463b4792f066653402f1c42c85f8e09"}, {"audio": 0, "start": 69154, "crunched": 0, "end": 69795, "filename": "/.git/objects/52/7b5003485c3ae0e7b6a0f5835c368584813b62"}, {"audio": 0, "start": 69795, "crunched": 0, "end": 70011, "filename": "/.git/objects/54/57c843ebff598261b2be02b3218ec6f7154c09"}, {"audio": 0, "start": 70011, "crunched": 0, "end": 80126, "filename": "/.git/objects/58/40171e37402a8dd522c9b2ea1ef65a397979ee"}, {"audio": 0, "start": 80126, "crunched": 0, "end": 80292, "filename": "/.git/objects/60/39943f9186338eb1ed6409257b0109f9627070"}, {"audio": 0, "start": 80292, "crunched": 0, "end": 90900, "filename": "/.git/objects/69/9f2b87589ad13b390e31fd09cd77b80e9c0ad1"}, {"audio": 0, "start": 90900, "crunched": 0, "end": 91065, "filename": "/.git/objects/75/d94c7f150111fe37efed2e6f0deda5c0f81915"}, {"audio": 0, "start": 91065, "crunched": 0, "end": 92284, "filename": "/.git/objects/76/490c5ee5ea533ad0471cdabcfbca41e7cb3396"}, {"audio": 0, "start": 92284, "crunched": 0, "end": 92812, "filename": "/.git/objects/85/976f6723e90d74b87ffd7037cd49a7772837d4"}, {"audio": 0, "start": 92812, "crunched": 0, "end": 93346, "filename": "/.git/objects/89/434afacedb505dfcc9587bc91984bd26009dfc"}, {"audio": 0, "start": 93346, "crunched": 0, "end": 93859, "filename": "/.git/objects/8d/2c49d931ee58fff01c0ebcbb1867674ddc3666"}, {"audio": 0, "start": 93859, "crunched": 0, "end": 93990, "filename": "/.git/objects/95/b5ed3549d016902783ad717edda98fe020b9ca"}, {"audio": 0, "start": 93990, "crunched": 0, "end": 94435, "filename": "/.git/objects/a0/4427c70a1047cb80cb8bb231bb0e6e9d6cff4e"}, {"audio": 0, "start": 94435, "crunched": 0, "end": 95050, "filename": "/.git/objects/a7/4e855a0e1d70377c46c377d4ee0f30349de442"}, {"audio": 0, "start": 95050, "crunched": 0, "end": 95128, "filename": "/.git/objects/a8/17b884bf722c1ad8ee9b70993b75466ef8980a"}, {"audio": 0, "start": 95128, "crunched": 0, "end": 95703, "filename": "/.git/objects/b0/1894c33a86a9abca65a9e3da03577f01c21461"}, {"audio": 0, "start": 95703, "crunched": 0, "end": 141389, "filename": "/.git/objects/b1/9aa7b9d5a928d08642b76c36b30160389af29c"}, {"audio": 0, "start": 141389, "crunched": 0, "end": 141920, "filename": "/.git/objects/b4/34848cdede0692e6f34992482e123ff4424368"}, {"audio": 0, "start": 141920, "crunched": 0, "end": 142010, "filename": "/.git/objects/b8/dbf5237bf2175f96be2cb54f1faf290691620e"}, {"audio": 0, "start": 142010, "crunched": 0, "end": 142430, "filename": "/.git/objects/c6/bbbc3bab752c04703a30bc939f4210dac433ca"}, {"audio": 0, "start": 142430, "crunched": 0, "end": 142639, "filename": "/.git/objects/c7/b594bd2dd3ddfa2f84e9cf0e0fccb12c844e97"}, {"audio": 0, "start": 142639, "crunched": 0, "end": 145155, "filename": "/.git/objects/c8/1a43cdf1a77a4c431d11b8c9d468d498b6ceb7"}, {"audio": 0, "start": 145155, "crunched": 0, "end": 145518, "filename": "/.git/objects/c9/974ec046cc14e63e8119b2b4b67208733bfce8"}, {"audio": 0, "start": 145518, "crunched": 0, "end": 145943, "filename": "/.git/objects/d3/b7cc8a5331112d06b0667a45034d003a09d6b0"}, {"audio": 0, "start": 145943, "crunched": 0, "end": 146307, "filename": "/.git/objects/dc/e23b993a893e97edbe7689abd6c9671a9e76e5"}, {"audio": 0, "start": 146307, "crunched": 0, "end": 226860, "filename": "/.git/objects/df/80c85aea0baade82ad55463bf4e5c31a196a4b"}, {"audio": 0, "start": 226860, "crunched": 0, "end": 227359, "filename": "/.git/objects/e4/e0948719f767fa0e7bac9569994471373d2322"}, {"audio": 0, "start": 227359, "crunched": 0, "end": 229271, "filename": "/.git/objects/e4/e45bf2fb60b3943e2af13ba1273d2c362ea998"}, {"audio": 0, "start": 229271, "crunched": 0, "end": 229634, "filename": "/.git/objects/e6/4090c6c18980790d9b43cc5d02b6c2f6f8c88a"}, {"audio": 0, "start": 229634, "crunched": 0, "end": 229649, "filename": "/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391"}, {"audio": 0, "start": 229649, "crunched": 0, "end": 232163, "filename": "/.git/objects/e6/e820d347b6a07af71de853a70e237969e5a3c4"}, {"audio": 0, "start": 232163, "crunched": 0, "end": 232671, "filename": "/.git/objects/e7/198ab0391044bc11eac3172c9b34bf26526b73"}, {"audio": 0, "start": 232671, "crunched": 0, "end": 233171, "filename": "/.git/objects/ed/f5268d0d3ec396acfdc3442c65fe939071104c"}, {"audio": 0, "start": 233171, "crunched": 0, "end": 237574, "filename": "/.git/objects/fa/e77ef83769d220da2e1585ef9ed43a751fdd48"}, {"audio": 0, "start": 237574, "crunched": 0, "end": 237735, "filename": "/.git/objects/fb/26a202b1ba57b9b6c6b7da9a126fc9795fc6df"}, {"audio": 0, "start": 237735, "crunched": 0, "end": 238054, "filename": "/.git/objects/fe/43b93ec1474b18bb2b203fb9dc11aad62a2a5d"}, {"audio": 0, "start": 238054, "crunched": 0, "end": 238244, "filename": "/.git/objects/ff/7e66a4da09e15cd937d23ae3ccb227b2e17778"}, {"audio": 0, "start": 238244, "crunched": 0, "end": 238285, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 238285, "crunched": 0, "end": 238317, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 238317, "crunched": 0, "end": 238358, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 238358, "crunched": 0, "end": 266526, "filename": "/fonts/Munro.ttf"}, {"audio": 0, "start": 266526, "crunched": 0, "end": 294210, "filename": "/fonts/MunroNarrow.ttf"}, {"audio": 0, "start": 294210, "crunched": 0, "end": 321510, "filename": "/fonts/MunroSmall.ttf"}, {"audio": 0, "start": 321510, "crunched": 0, "end": 322018, "filename": "/img/characters/barackobama.png"}, {"audio": 0, "start": 322018, "crunched": 0, "end": 322532, "filename": "/img/characters/billclinton.png"}, {"audio": 0, "start": 322532, "crunched": 0, "end": 323043, "filename": "/img/characters/davidcameron.png"}, {"audio": 0, "start": 323043, "crunched": 0, "end": 323569, "filename": "/img/characters/hillaryclinton.png"}, {"audio": 0, "start": 323569, "crunched": 0, "end": 324057, "filename": "/img/characters/lizardperson.png"}, {"audio": 0, "start": 324057, "crunched": 0, "end": 324667, "filename": "/img/characters/queenelizabeth.png"}, {"audio": 0, "start": 324667, "crunched": 0, "end": 325222, "filename": "/img/characters/queensguard.png"}, {"audio": 0, "start": 325222, "crunched": 0, "end": 325715, "filename": "/img/characters/secretagent.png"}, {"audio": 0, "start": 325715, "crunched": 0, "end": 326195, "filename": "/img/characters/secretagent2.png"}, {"audio": 0, "start": 326195, "crunched": 0, "end": 329474, "filename": "/img/ui/background.png"}, {"audio": 0, "start": 329474, "crunched": 0, "end": 330069, "filename": "/img/ui/btn_capture.png"}, {"audio": 0, "start": 330069, "crunched": 0, "end": 330654, "filename": "/img/ui/btn_capture_hover.png"}, {"audio": 0, "start": 330654, "crunched": 0, "end": 330958, "filename": "/img/ui/btn_place_marker.png"}, {"audio": 0, "start": 330958, "crunched": 0, "end": 331257, "filename": "/img/ui/btn_place_marker_hover.png"}, {"audio": 0, "start": 331257, "crunched": 0, "end": 331662, "filename": "/img/ui/btn_vis.png"}, {"audio": 0, "start": 331662, "crunched": 0, "end": 332062, "filename": "/img/ui/btn_vis_toggle.png"}, {"audio": 0, "start": 332062, "crunched": 0, "end": 332359, "filename": "/img/ui/bubble.png"}, {"audio": 0, "start": 332359, "crunched": 0, "end": 334712, "filename": "/img/ui/gameover.png"}, {"audio": 0, "start": 334712, "crunched": 0, "end": 336996, "filename": "/img/ui/gamewin.png"}, {"audio": 0, "start": 336996, "crunched": 0, "end": 337107, "filename": "/img/ui/marker_0.png"}, {"audio": 0, "start": 337107, "crunched": 0, "end": 337300, "filename": "/img/ui/marker_1.png"}, {"audio": 0, "start": 337300, "crunched": 0, "end": 337474, "filename": "/img/ui/marker_2.png"}, {"audio": 0, "start": 337474, "crunched": 0, "end": 337693, "filename": "/img/ui/particle.png"}, {"audio": 1, "start": 337693, "crunched": 0, "end": 348243, "filename": "/sounds/beep.wav"}, {"audio": 1, "start": 348243, "crunched": 0, "end": 358793, "filename": "/sounds/beep2.wav"}, {"audio": 1, "start": 358793, "crunched": 0, "end": 371529, "filename": "/sounds/hit.wav"}, {"audio": 1, "start": 371529, "crunched": 0, "end": 427873, "filename": "/sounds/switch.wav"}, {"audio": 1, "start": 427873, "crunched": 0, "end": 546571, "filename": "/sounds/transform.wav"}], "remote_package_size": 546571, "package_uuid": "e5a4104b-5585-4292-8e39-6d164537f0ee"});

})();
