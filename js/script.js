const oaSignKey = 'OA-Sign',
   apiVersion = '1.0';
const sessionIdKey = 'sessionId';

document.getElementById('sessionIdSetter').addEventListener('click', () => {
   openModal();
});

function calcHash() {
    let _0xe9e1 = [
      'l L(d){v(p r,a,m="",f=-1;++f<d.q;)r=d.x(f),a=f+1<d.q?d.x(f+1):0,r>=1R&&1W>=r&&a>=1V&&1U>=a&&(r=1F+((Q&r)<<10)+(Q&a),f++),1v>=r?m+=y.A(r):1f>=r?m+=y.A(1Q|r>>>6&1S,u|w&r):C>=r?m+=y.A(1I|r>>>12&15,u|r>>>6&w,u|w&r):1A>=r&&(m+=y.A(1y|r>>>18&7,u|r>>>12&w,u|r>>>6&w,u|w&r));o m}l O(d){v(p r=P(d.q>>2),a=0;a<r.q;a++)r[a]=0;v(p a=0;a<8*d.q;a+=8)r[a>>5]|=(E&d.x(a/8))<<a%B;o r}l M(d,r){d[r>>5]|=u<<r%B,d[(r+1w>>>9<<4)+14]=r;v(p a=1H,m=-1D,f=-1E,n=1X,t=0;t<d.q;t+=16){p i=a,h=m,g=f,e=n;a=k(a,m,f,n,d[t+0],7,-1G),n=k(n,a,m,f,d[t+1],12,-1C),f=k(f,n,a,m,d[t+2],17,1B),m=k(m,f,n,a,d[t+3],22,-1x),a=k(a,m,f,n,d[t+4],7,-1J),n=k(n,a,m,f,d[t+5],12,1T),f=k(f,n,a,m,d[t+6],17,-1L),m=k(m,f,n,a,d[t+7],22,-1K),a=k(a,m,f,n,d[t+8],7,1M),n=k(n,a,m,f,d[t+9],12,-1N),f=k(f,n,a,m,d[t+10],17,-1P),m=k(m,f,n,a,d[t+11],22,-1O),a=k(a,m,f,n,d[t+12],7,1u),n=k(n,a,m,f,d[t+13],12,-1t),f=k(f,n,a,m,d[t+14],17,-19),m=k(m,f,n,a,d[t+15],22,Z),a=j(a,m,f,n,d[t+1],5,-1a),n=j(n,a,m,f,d[t+6],9,-1b),f=j(f,n,a,m,d[t+11],14,1d),m=j(m,f,n,a,d[t+0],20,-1c),a=j(a,m,f,n,d[t+5],5,-Y),n=j(n,a,m,f,d[t+10],9,X),f=j(f,n,a,m,d[t+15],14,-S),m=j(m,f,n,a,d[t+4],20,-R),a=j(a,m,f,n,d[t+9],5,T),n=j(n,a,m,f,d[t+14],9,-U),f=j(f,n,a,m,d[t+3],14,-W),m=j(m,f,n,a,d[t+8],20,V),a=j(a,m,f,n,d[t+13],5,-1e),n=j(n,a,m,f,d[t+2],9,-1p),f=j(f,n,a,m,d[t+7],14,1o),m=j(m,f,n,a,d[t+12],20,-1q),a=b(a,m,f,n,d[t+5],4,-1r),n=b(n,a,m,f,d[t+8],11,-1s),f=b(f,n,a,m,d[t+11],16,1n),m=b(m,f,n,a,d[t+14],23,-1m),a=b(a,m,f,n,d[t+1],4,-1h),n=b(n,a,m,f,d[t+4],11,1g),f=b(f,n,a,m,d[t+7],16,-1i),m=b(m,f,n,a,d[t+10],23,-1j),a=b(a,m,f,n,d[t+13],4,1l),n=b(n,a,m,f,d[t+0],11,-1k),f=b(f,n,a,m,d[t+3],16,-1z),m=b(m,f,n,a,d[t+6],23,25),a=b(a,m,f,n,d[t+9],4,-2r),n=b(n,a,m,f,d[t+12],11,-2s),f=b(f,n,a,m,d[t+15],16,2t),m=b(m,f,n,a,d[t+2],23,-2q),a=c(a,m,f,n,d[t+0],6,-2p),n=c(n,a,m,f,d[t+7],10,2m),f=c(f,n,a,m,d[t+14],15,-2n),m=c(m,f,n,a,d[t+5],21,-2v),a=c(a,m,f,n,d[t+12],6,1Y),n=c(n,a,m,f,d[t+3],10,-2x),f=c(f,n,a,m,d[t+10],15,-2w),m=c(m,f,n,a,d[t+1],21,-2y),a=c(a,m,f,n,d[t+8],6,2o),n=c(n,a,m,f,d[t+15],10,-2k),f=c(f,n,a,m,d[t+6],15,-28),m=c(m,f,n,a,d[t+13],21,29),a=c(a,m,f,n,d[t+4],6,-2a),n=c(n,a,m,f,d[t+11],10,-27),f=c(f,n,a,m,d[t+2],15,24),m=c(m,f,n,a,d[t+9],21,-2b),a=s(a,i),m=s(m,h),f=s(f,g),n=s(n,e)}o P(a,m,f,n)}l z(d,r,a,m,f,n){o s(D(s(s(r,d),s(m,n)),f),a)}l k(d,r,a,m,f,n,t){o z(r&a|~r&m,d,r,f,n,t)}l j(d,r,a,m,f,n,t){o z(r&m|a&~m,d,r,f,n,t)}l b(d,r,a,m,f,n,t){o z(r^a^m,d,r,f,n,t)}l c(d,r,a,m,f,n,t){o z(a^(r|~m),d,r,f,n,t)}l s(d,r){p a=(C&d)+(C&r),m=(d>>16)+(r>>16)+(a>>16);o m<<16|C&a}l N(d){v(p r="",a=0;a<B*d.q;a+=8)r+=y.A(d[a>>5]>>>a%B&E);o r}l D(d,r){o d<<r|d>>>B-r}l J(d){v(p r,a="2f",m="",f=0;f<d.q;f++)r=d.x(f),m+=a.G(r>>>4&15)+a.G(15&r);o m}p K=l(){v(p d=[2e,2d,2g,2h,2j,2i,2c,1Z,"26"],r=[],a=0;4>a;a++)r[a]=d[d[d.q-1].x(8+a)%8];p m=L(H.2l("F-I"));r=r.2z(O(m)),H.2u("F-I",J(N(M(r,8*(16+m.q)))))};K();',
      "|",
      "split",
      "||||||||||_|md5_hh|md5_ii|||||||md5_gg|md5_ff|function|||return|var|length||safe_add||128|for|63|charCodeAt|String|md5_cmn|fromCharCode|32|65535|bit_rol|255|OA|charAt|sessionStorage|Sign|rstr2hex|init|str2rstr_utf8|binl_md5|binl2rstr|rstr2binl|Array|1023|405537848|660478335|568446438|1019803690|1163531501|187363961|38016083|701558691|1236535329||||||||||1502002290|165796510|1069501632|373897302|643717713|1444681467|2047|1272893353|1530992060|155497632|1094730640|358537222|681279174|35309556|1839030562|1735328473|51403784|1926607734|378558|2022574463|40341101|1804603682|127|64|1044525330|240|722521979|2097151|606105819|389564586|271733879|1732584194|65536|680876936|1732584193|224|176418897|45705983|1473231341|1770035416|1958414417|1990404162|42063|192|55296|31|1200080426|57343|56320|56319|271733878|1700485571|1177251686|||||718787259|76029189|djYtoDr6dqcr8s36|1120210379|1560198380|1309151649|145523070|343485551|791828307|1900374625|1952016996|0123456789abcdef|1211199315|1714500456|1751927404|1447120487|30611744|getItem|1126891415|1416354905|1873313359|198630844|995338651|640364487|421815835|530742520|setItem|57434055|1051523|1894986606|2054922799|concat",
      "",
      "fromCharCode",
      "replace",
      "\\w+",
      "\\b",
      "g",
    ];
    eval(
      (function (e, t, n, r, o, a) {
        if (
          ((o = function (e) {
            return (
              (e < 62 ? _0xe9e1[4] : o(parseInt(e / 62))) +
              ((e %= 62) > 35 ? String[_0xe9e1[5]](e + 29) : e.toString(36))
            );
          }),
          !_0xe9e1[4][_0xe9e1[6]](/^/, String))
        ) {
          for (; n--; ) a[o(n)] = r[n] || o(n);
          (r = [
            function (e) {
              return a[e];
            },
          ]),
            (o = function () {
              return _0xe9e1[7];
            }),
            (n = 1);
        }
        for (; n--; )
          r[n] &&
            (e = e[_0xe9e1[6]](
              new RegExp(_0xe9e1[8] + o(n) + _0xe9e1[8], _0xe9e1[9]),
              r[n]
            ));
        return e;
      })(_0xe9e1[0], 0, 160, _0xe9e1[3][_0xe9e1[2]](_0xe9e1[1]), 0, {})
    );
}

function prepareOASign(api, param) {
   const deviceId = 3833609500 + 1e3 * Math.random(),
      timeStamp = 1e3 * Date.now() + new Date().getMilliseconds(),
      sessionId = sessionStorage.getItem(sessionIdKey);

   sessionStorage.setItem(oaSignKey, deviceId + sessionId + api + apiVersion + param + timeStamp);
   calcHash();
   return {deviceId, timeStamp, sessionId};
}

const wait = ms => new Promise((resolve) => {
   setTimeout(() => resolve(), ms);
});

function getDO(DO) {
   params = `{"timeType":"audit_time","searchType":"orderInfo","search":"${DO}","platformStatus":"","expressName":"","prompt":"","logisticCompanyId":"","kinds":"=","kindsNum":"","goods":"=","deliverySn":"","goodsNum":"","sellerId":"","distribution":"","total_items":1,"page":1,"limit":20,"platformContain":"in","promptContain":"in","markContain":"in","repositoryContain":"in","repositoryId":[],"warehouseId":"20","start":"2025-03-07 00:00:00","end":"2025-04-07 23:59:59"}`
   const {deviceId, timeStamp, sessionId} = prepareOASign('wms.deliveryOrder.listByWarehouseId', params);
   data = `api=wms.deliveryOrder.listByWarehouseId&version=1.0&timestamp=${timeStamp}&params=${encodeURIComponent(params)}&`
   api = 'https://wms-api.flashfulfillment.vn/?api=wms.deliveryOrder.listByWarehouseId';
   headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'OA-App-Key': '1001520',
      'OA-App-Market-ID': '678',
      'OA-App-Version': '1.0',
      'OA-Device-Id': deviceId,
      'OA-Session-Id': sessionId,
      'OA-Sign': sessionStorage.getItem(oaSignKey)
   };

   // if (!sessionId) {
   //    return new Promise((resolve, reject) => {
   //       reject(new Error("Session expired", {cause: {code: "SESSIONEXPIRED", message: "Session expired" }}));
   //    });
   // }

   return fetch(api, {
      method: 'POST',
      headers: headers,
      body: data
   })
   .then(res => {
      if (!res.success) {
         if (res.errorCode == 'AD.SessionNotExists') {
            sessionStorage.removeItem(sessionIdKey);
            throw new Error("Session expired", {cause: {code: "SESSIONEXPIRED", message: "Session expired" }});
         }
      }
      return res.json();
   })
   .catch(err => {
      console.error("Failed to fetch: ", err);
      throw err;
   });
};

async function getDOs(DOs) {
   try {
      const promises = [];
      for (const DO of DOs) {
         const rs = await getDO(DO);
         promises.push(rs);
         await new Promise(resolve => setTimeout(resolve, 200));
      };
      console.log('Requests fulfiled: ', DOs.length);
      let failed = 0, notFound = 0;
      const result = promises.map(item => {
         if (item && item.data) {
               obj = item.data.items[0];
               if (!obj) {
                  notFound += 1;
                  return '';
               }
               // return {
               //     deliverySn: obj.deliverySn,
               //     sellerName: obj.sellerName,
               //     orderSn: obj.orderSn,
               //     express: `${obj.expressName}\n${obj.expressSn}`
               // };
               // const rows = [
               //     ["v1", "v2", "v3", "v4"],
               //     ["x1", "x2", "x3", "x4"]
               //   ];

               //   const tsv = rows.map(row => row.join('\t')).join('\n');
               
               //   console.log(tsv);
               return `${obj.deliverySn}\t${obj.sellerName}\t${obj.orderSn}\t${obj.expressName} ${obj.expressSn}`;
         } else {
               failed += 1;
               return '';
         }
      }).join('\n');
      console.log(result)
      return {failed, notFound, result}
   } catch (error) {
      console.log(error);
      throw error;
   }
}

function showLoading() {
   loading = document.getElementById('loading');
   loading.classList.remove("hide");
}
function stopLoading() {
   loading = document.getElementById('loading');
   loading.classList.add("hide");
}

function handleClick() {
   if (!sessionStorage.getItem(sessionIdKey)) {
      openModal();
   }
   showLoading();
   notification.style.visibility = 'hidden';
   const input = document.getElementById('userInput').value;
   // const response = input ? `You entered: ${input}` : "Please enter something!";
   DOIds = input.trim().split(' ');
   console.log('length: ', DOIds.length);
   getDOs(DOIds).then(res => {
      const copyHolder = res?.result ? navigator.clipboard.writeText(res.result) : Promise.resolve();
      return copyHolder.then(() => Promise.resolve({
         failed: res.failed, 
         notFound: res.notFound
      }));
   }).then(res => {
      if (res.failed == 0 && res.notFound == 0) {
         notification.textContent = 'Đã copy nội dung. Hãy dán nó vào sheet!';
      } else {
         notification.textContent = `${res.failed} mục thất bại, ${res.notFound} mục không tìm thấy.`;
      }
      notification.style.visibility = 'visible';
      stopLoading();
   })
   .catch(err => {
      console.log(err)
   });
}


/*
Modal
*/
function openModal() {
   document.getElementById('sessionIdModal').style.display = "flex";
}

function closeModal() {
   document.getElementById('sessionIdModal').style.display = "none";
}

function submitModal() {
   const sessId = document.getElementById("sessionId").value.trim();
   if (!sessId) {
      alert("Vui lòng nhập vào.");
      return;
   }
   sessionStorage.setItem(sessionIdKey, sessId);
   closeModal();
}
