!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(e.braintree||(e.braintree={})).dataCollector=t()}}(function(){var t;return function e(t,n,r){function i(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var d=n[a]={exports:{}};t[a][0].call(d.exports,function(e){var n=t[a][1][e];return i(n?n:e)},d,d.exports,e,t,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){},{}],2:[function(e,n,r){"use strict";function i(t){throw t}function o(t,e,n){4!==e.length&&i(new f.exception.invalid("invalid aes block size"));var r=t.b[n],o=e[0]^r[0],a=e[n?3:1]^r[1],s=e[2]^r[2];e=e[n?1:3]^r[3];var c,h,d,u,l=r.length/4-2,p=4,m=[0,0,0,0];c=t.k[n],t=c[0];var y=c[1],g=c[2],v=c[3],b=c[4];for(u=0;l>u;u++)c=t[o>>>24]^y[a>>16&255]^g[s>>8&255]^v[255&e]^r[p],h=t[a>>>24]^y[s>>16&255]^g[e>>8&255]^v[255&o]^r[p+1],d=t[s>>>24]^y[e>>16&255]^g[o>>8&255]^v[255&a]^r[p+2],e=t[e>>>24]^y[o>>16&255]^g[a>>8&255]^v[255&s]^r[p+3],p+=4,o=c,a=h,s=d;for(u=0;4>u;u++)m[n?3&-u:u]=b[o>>>24]<<24^b[a>>16&255]<<16^b[s>>8&255]<<8^b[255&e]^r[p++],c=o,o=a,a=s,s=e,e=c;return m}function a(t,e){var n,r,i,o=e.slice(0),a=t.r,s=t.b,c=a[0],h=a[1],d=a[2],u=a[3],l=a[4],p=a[5],f=a[6],m=a[7];for(n=0;64>n;n++)16>n?r=o[n]:(r=o[n+1&15],i=o[n+14&15],r=o[15&n]=(r>>>7^r>>>18^r>>>3^r<<25^r<<14)+(i>>>17^i>>>19^i>>>10^i<<15^i<<13)+o[15&n]+o[n+9&15]|0),r=r+m+(l>>>6^l>>>11^l>>>25^l<<26^l<<21^l<<7)+(f^l&(p^f))+s[n],m=f,f=p,p=l,l=u+r|0,u=d,d=h,h=c,c=r+(h&d^u&(h^d))+(h>>>2^h>>>13^h>>>22^h<<30^h<<19^h<<10)|0;a[0]=a[0]+c|0,a[1]=a[1]+h|0,a[2]=a[2]+d|0,a[3]=a[3]+u|0,a[4]=a[4]+l|0,a[5]=a[5]+p|0,a[6]=a[6]+f|0,a[7]=a[7]+m|0}function s(t,e){var n,r=f.random.w[t],i=[];for(n in r)r.hasOwnProperty(n)&&i.push(r[n]);for(n=0;n<i.length;n++)i[n](e)}function c(t){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?f.random.addEntropy(window.performance.now(),t,"loadtime"):f.random.addEntropy((new Date).valueOf(),t,"loadtime")}function h(t){t.b=d(t).concat(d(t)),t.A=new f.cipher.aes(t.b)}function d(t){for(var e=0;4>e&&(t.f[e]=t.f[e]+1|0,!t.f[e]);e++);return t.A.encrypt(t.f)}function u(t,e){return function(){e.apply(t,arguments)}}var l=void 0,p=!1,f={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}};"undefined"!=typeof n&&n.exports&&(n.exports=f),"function"==typeof t&&t([],function(){return f}),f.cipher.aes=function(t){this.k[0][0][0]||this.D();var e,n,r,o,a=this.k[0][4],s=this.k[1];e=t.length;var c=1;for(4!==e&&6!==e&&8!==e&&i(new f.exception.invalid("invalid aes key size")),this.b=[r=t.slice(0),o=[]],t=e;4*e+28>t;t++)n=r[t-1],(0===t%e||8===e&&4===t%e)&&(n=a[n>>>24]<<24^a[n>>16&255]<<16^a[n>>8&255]<<8^a[255&n],0===t%e&&(n=n<<8^n>>>24^c<<24,c=c<<1^283*(c>>7))),r[t]=r[t-e]^n;for(e=0;t;e++,t--)n=r[3&e?t:t-4],o[e]=4>=t||4>e?n:s[0][a[n>>>24]]^s[1][a[n>>16&255]]^s[2][a[n>>8&255]]^s[3][a[255&n]]},f.cipher.aes.prototype={encrypt:function(t){return o(this,t,0)},decrypt:function(t){return o(this,t,1)},k:[[[],[],[],[],[]],[[],[],[],[],[]]],D:function(){var t,e,n,r,i,o,a,s=this.k[0],c=this.k[1],h=s[4],d=c[4],u=[],l=[];for(t=0;256>t;t++)l[(u[t]=t<<1^283*(t>>7))^t]=t;for(e=n=0;!h[e];e^=r||1,n=l[n]||1)for(o=n^n<<1^n<<2^n<<3^n<<4,o=o>>8^255&o^99,h[e]=o,d[o]=e,i=u[t=u[r=u[e]]],a=16843009*i^65537*t^257*r^16843008*e,i=257*u[o]^16843008*o,t=0;4>t;t++)s[t][e]=i=i<<24^i>>>8,c[t][o]=a=a<<24^a>>>8;for(t=0;5>t;t++)s[t]=s[t].slice(0),c[t]=c[t].slice(0)}},f.bitArray={bitSlice:function(t,e,n){return t=f.bitArray.P(t.slice(e/32),32-(31&e)).slice(1),n===l?t:f.bitArray.clamp(t,n-e)},extract:function(t,e,n){var r=Math.floor(-e-n&31);return(-32&(e+n-1^e)?t[e/32|0]<<32-r^t[e/32+1|0]>>>r:t[e/32|0]>>>r)&(1<<n)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e);var n=t[t.length-1],r=f.bitArray.getPartial(n);return 32===r?t.concat(e):f.bitArray.P(e,r,0|n,t.slice(0,t.length-1))},bitLength:function(t){var e=t.length;return 0===e?0:32*(e-1)+f.bitArray.getPartial(t[e-1])},clamp:function(t,e){if(32*t.length<e)return t;t=t.slice(0,Math.ceil(e/32));var n=t.length;return e&=31,n>0&&e&&(t[n-1]=f.bitArray.partial(e,t[n-1]&2147483648>>e-1,1)),t},partial:function(t,e,n){return 32===t?e:(n?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(f.bitArray.bitLength(t)!==f.bitArray.bitLength(e))return p;var n,r=0;for(n=0;n<t.length;n++)r|=t[n]^e[n];return 0===r},P:function(t,e,n,r){var i;for(i=0,r===l&&(r=[]);e>=32;e-=32)r.push(n),n=0;if(0===e)return r.concat(t);for(i=0;i<t.length;i++)r.push(n|t[i]>>>e),n=t[i]<<32-e;return i=t.length?t[t.length-1]:0,t=f.bitArray.getPartial(i),r.push(f.bitArray.partial(e+t&31,e+t>32?n:r.pop(),1)),r},l:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]},byteswapM:function(t){var e,n;for(e=0;e<t.length;++e)n=t[e],t[e]=n>>>24|n>>>8&65280|(65280&n)<<8|n<<24;return t}},f.codec.utf8String={fromBits:function(t){var e,n,r="",i=f.bitArray.bitLength(t);for(e=0;i/8>e;e++)0===(3&e)&&(n=t[e/4]),r+=String.fromCharCode(n>>>24),n<<=8;return decodeURIComponent(escape(r))},toBits:function(t){t=unescape(encodeURIComponent(t));var e,n=[],r=0;for(e=0;e<t.length;e++)r=r<<8|t.charCodeAt(e),3===(3&e)&&(n.push(r),r=0);return 3&e&&n.push(f.bitArray.partial(8*(3&e),r)),n}},f.codec.hex={fromBits:function(t){var e,n="";for(e=0;e<t.length;e++)n+=((0|t[e])+0xf00000000000).toString(16).substr(4);return n.substr(0,f.bitArray.bitLength(t)/4)},toBits:function(t){var e,n,r=[];for(t=t.replace(/\s|0x/g,""),n=t.length,t+="00000000",e=0;e<t.length;e+=8)r.push(0^parseInt(t.substr(e,8),16));return f.bitArray.clamp(r,4*n)}},f.codec.base64={J:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(t,e,n){var r="",i=0,o=f.codec.base64.J,a=0,s=f.bitArray.bitLength(t);for(n&&(o=o.substr(0,62)+"-_"),n=0;6*r.length<s;)r+=o.charAt((a^t[n]>>>i)>>>26),6>i?(a=t[n]<<6-i,i+=26,n++):(a<<=6,i-=6);for(;3&r.length&&!e;)r+="=";return r},toBits:function(t,e){t=t.replace(/\s|=/g,"");var n,r,o=[],a=0,s=f.codec.base64.J,c=0;for(e&&(s=s.substr(0,62)+"-_"),n=0;n<t.length;n++)r=s.indexOf(t.charAt(n)),0>r&&i(new f.exception.invalid("this isn't base64!")),a>26?(a-=26,o.push(c^r>>>a),c=r<<32-a):(a+=6,c^=r<<32-a);return 56&a&&o.push(f.bitArray.partial(56&a,c,1)),o}},f.codec.base64url={fromBits:function(t){return f.codec.base64.fromBits(t,1,1)},toBits:function(t){return f.codec.base64.toBits(t,1)}},f.hash.sha256=function(t){this.b[0]||this.D(),t?(this.r=t.r.slice(0),this.o=t.o.slice(0),this.h=t.h):this.reset()},f.hash.sha256.hash=function(t){return(new f.hash.sha256).update(t).finalize()},f.hash.sha256.prototype={blockSize:512,reset:function(){return this.r=this.N.slice(0),this.o=[],this.h=0,this},update:function(t){"string"==typeof t&&(t=f.codec.utf8String.toBits(t));var e,n=this.o=f.bitArray.concat(this.o,t);for(e=this.h,t=this.h=e+f.bitArray.bitLength(t),e=512+e&-512;t>=e;e+=512)a(this,n.splice(0,16));return this},finalize:function(){var t,e=this.o,n=this.r,e=f.bitArray.concat(e,[f.bitArray.partial(1,1)]);for(t=e.length+2;15&t;t++)e.push(0);for(e.push(Math.floor(this.h/4294967296)),e.push(0|this.h);e.length;)a(this,e.splice(0,16));return this.reset(),n},N:[],b:[],D:function(){function t(t){return 4294967296*(t-Math.floor(t))|0}var e,n=0,r=2;t:for(;64>n;r++){for(e=2;r>=e*e;e++)if(0===r%e)continue t;8>n&&(this.N[n]=t(Math.pow(r,.5))),this.b[n]=t(Math.pow(r,1/3)),n++}}},f.mode.ccm={name:"ccm",encrypt:function(t,e,n,r,o){var a,s=e.slice(0),c=f.bitArray,h=c.bitLength(n)/8,d=c.bitLength(s)/8;for(o=o||64,r=r||[],7>h&&i(new f.exception.invalid("ccm: iv must be at least 7 bytes")),a=2;4>a&&d>>>8*a;a++);return 15-h>a&&(a=15-h),n=c.clamp(n,8*(15-a)),e=f.mode.ccm.L(t,e,n,r,o,a),s=f.mode.ccm.p(t,s,n,e,o,a),c.concat(s.data,s.tag)},decrypt:function(t,e,n,r,o){o=o||64,r=r||[];var a=f.bitArray,s=a.bitLength(n)/8,c=a.bitLength(e),h=a.clamp(e,c-o),d=a.bitSlice(e,c-o),c=(c-o)/8;for(7>s&&i(new f.exception.invalid("ccm: iv must be at least 7 bytes")),e=2;4>e&&c>>>8*e;e++);return 15-s>e&&(e=15-s),n=a.clamp(n,8*(15-e)),h=f.mode.ccm.p(t,h,n,d,o,e),t=f.mode.ccm.L(t,h.data,n,r,o,e),a.equal(h.tag,t)||i(new f.exception.corrupt("ccm: tag doesn't match")),h.data},L:function(t,e,n,r,o,a){var s=[],c=f.bitArray,h=c.l;if(o/=8,(o%2||4>o||o>16)&&i(new f.exception.invalid("ccm: invalid tag length")),(4294967295<r.length||4294967295<e.length)&&i(new f.exception.bug("ccm: can't deal with 4GiB or more data")),a=[c.partial(8,(r.length?64:0)|o-2<<2|a-1)],a=c.concat(a,n),a[3]|=c.bitLength(e)/8,a=t.encrypt(a),r.length)for(n=c.bitLength(r)/8,65279>=n?s=[c.partial(16,n)]:4294967295>=n&&(s=c.concat([c.partial(16,65534)],[n])),s=c.concat(s,r),r=0;r<s.length;r+=4)a=t.encrypt(h(a,s.slice(r,r+4).concat([0,0,0])));for(r=0;r<e.length;r+=4)a=t.encrypt(h(a,e.slice(r,r+4).concat([0,0,0])));return c.clamp(a,8*o)},p:function(t,e,n,r,i,o){var a,s=f.bitArray;a=s.l;var c=e.length,h=s.bitLength(e);if(n=s.concat([s.partial(8,o-1)],n).concat([0,0,0]).slice(0,4),r=s.bitSlice(a(r,t.encrypt(n)),0,i),!c)return{tag:r,data:[]};for(a=0;c>a;a+=4)n[3]++,i=t.encrypt(n),e[a]^=i[0],e[a+1]^=i[1],e[a+2]^=i[2],e[a+3]^=i[3];return{tag:r,data:s.clamp(e,h)}}},f.mode.ocb2={name:"ocb2",encrypt:function(t,e,n,r,o,a){128!==f.bitArray.bitLength(n)&&i(new f.exception.invalid("ocb iv must be 128 bits"));var s,c=f.mode.ocb2.H,h=f.bitArray,d=h.l,u=[0,0,0,0];n=c(t.encrypt(n));var l,p=[];for(r=r||[],o=o||64,s=0;s+4<e.length;s+=4)l=e.slice(s,s+4),u=d(u,l),p=p.concat(d(n,t.encrypt(d(n,l)))),n=c(n);return l=e.slice(s),e=h.bitLength(l),s=t.encrypt(d(n,[0,0,0,e])),l=h.clamp(d(l.concat([0,0,0]),s),e),u=d(u,d(l.concat([0,0,0]),s)),u=t.encrypt(d(u,d(n,c(n)))),r.length&&(u=d(u,a?r:f.mode.ocb2.pmac(t,r))),p.concat(h.concat(l,h.clamp(u,o)))},decrypt:function(t,e,n,r,o,a){128!==f.bitArray.bitLength(n)&&i(new f.exception.invalid("ocb iv must be 128 bits")),o=o||64;var s,c,h=f.mode.ocb2.H,d=f.bitArray,u=d.l,l=[0,0,0,0],p=h(t.encrypt(n)),m=f.bitArray.bitLength(e)-o,y=[];for(r=r||[],n=0;m/32>n+4;n+=4)s=u(p,t.decrypt(u(p,e.slice(n,n+4)))),l=u(l,s),y=y.concat(s),p=h(p);return c=m-32*n,s=t.encrypt(u(p,[0,0,0,c])),s=u(s,d.clamp(e.slice(n),c).concat([0,0,0])),l=u(l,s),l=t.encrypt(u(l,u(p,h(p)))),r.length&&(l=u(l,a?r:f.mode.ocb2.pmac(t,r))),d.equal(d.clamp(l,o),d.bitSlice(e,m))||i(new f.exception.corrupt("ocb: tag doesn't match")),y.concat(d.clamp(s,c))},pmac:function(t,e){var n,r=f.mode.ocb2.H,i=f.bitArray,o=i.l,a=[0,0,0,0],s=t.encrypt([0,0,0,0]),s=o(s,r(r(s)));for(n=0;n+4<e.length;n+=4)s=r(s),a=o(a,t.encrypt(o(s,e.slice(n,n+4))));return n=e.slice(n),128>i.bitLength(n)&&(s=o(s,r(s)),n=i.concat(n,[-2147483648,0,0,0])),a=o(a,n),t.encrypt(o(r(o(s,r(s))),a))},H:function(t){return[t[0]<<1^t[1]>>>31,t[1]<<1^t[2]>>>31,t[2]<<1^t[3]>>>31,t[3]<<1^135*(t[0]>>>31)]}},f.mode.gcm={name:"gcm",encrypt:function(t,e,n,r,i){var o=e.slice(0);return e=f.bitArray,r=r||[],t=f.mode.gcm.p(!0,t,o,r,n,i||128),e.concat(t.data,t.tag)},decrypt:function(t,e,n,r,o){var a=e.slice(0),s=f.bitArray,c=s.bitLength(a);return o=o||128,r=r||[],c>=o?(e=s.bitSlice(a,c-o),a=s.bitSlice(a,0,c-o)):(e=a,a=[]),t=f.mode.gcm.p(p,t,a,r,n,o),s.equal(t.tag,e)||i(new f.exception.corrupt("gcm: tag doesn't match")),t.data},Z:function(t,e){var n,r,i,o,a,s=f.bitArray.l;for(i=[0,0,0,0],o=e.slice(0),n=0;128>n;n++){for((r=0!==(t[Math.floor(n/32)]&1<<31-n%32))&&(i=s(i,o)),a=0!==(1&o[3]),r=3;r>0;r--)o[r]=o[r]>>>1|(1&o[r-1])<<31;o[0]>>>=1,a&&(o[0]^=-520093696)}return i},g:function(t,e,n){var r,i=n.length;for(e=e.slice(0),r=0;i>r;r+=4)e[0]^=4294967295&n[r],e[1]^=4294967295&n[r+1],e[2]^=4294967295&n[r+2],e[3]^=4294967295&n[r+3],e=f.mode.gcm.Z(e,t);return e},p:function(t,e,n,r,i,o){var a,s,c,h,d,u,l,p,m=f.bitArray;for(u=n.length,l=m.bitLength(n),p=m.bitLength(r),s=m.bitLength(i),a=e.encrypt([0,0,0,0]),96===s?(i=i.slice(0),i=m.concat(i,[1])):(i=f.mode.gcm.g(a,[0,0,0,0],i),i=f.mode.gcm.g(a,i,[0,0,Math.floor(s/4294967296),4294967295&s])),s=f.mode.gcm.g(a,[0,0,0,0],r),d=i.slice(0),r=s.slice(0),t||(r=f.mode.gcm.g(a,s,n)),h=0;u>h;h+=4)d[3]++,c=e.encrypt(d),n[h]^=c[0],n[h+1]^=c[1],n[h+2]^=c[2],n[h+3]^=c[3];return n=m.clamp(n,l),t&&(r=f.mode.gcm.g(a,s,n)),t=[Math.floor(p/4294967296),4294967295&p,Math.floor(l/4294967296),4294967295&l],r=f.mode.gcm.g(a,r,t),c=e.encrypt(i),r[0]^=c[0],r[1]^=c[1],r[2]^=c[2],r[3]^=c[3],{tag:m.bitSlice(r,0,o),data:n}}},f.misc.hmac=function(t,e){this.M=e=e||f.hash.sha256;var n,r=[[],[]],i=e.prototype.blockSize/32;for(this.n=[new e,new e],t.length>i&&(t=e.hash(t)),n=0;i>n;n++)r[0][n]=909522486^t[n],r[1][n]=1549556828^t[n];this.n[0].update(r[0]),this.n[1].update(r[1]),this.G=new e(this.n[0])},f.misc.hmac.prototype.encrypt=f.misc.hmac.prototype.mac=function(t){return this.Q&&i(new f.exception.invalid("encrypt on already updated hmac called!")),this.update(t),this.digest(t)},f.misc.hmac.prototype.reset=function(){this.G=new this.M(this.n[0]),this.Q=p},f.misc.hmac.prototype.update=function(t){this.Q=!0,this.G.update(t)},f.misc.hmac.prototype.digest=function(){var t=this.G.finalize(),t=new this.M(this.n[1]).update(t).finalize();return this.reset(),t},f.misc.pbkdf2=function(t,e,n,r,o){n=n||1e3,(0>r||0>n)&&i(f.exception.invalid("invalid params to pbkdf2")),"string"==typeof t&&(t=f.codec.utf8String.toBits(t)),"string"==typeof e&&(e=f.codec.utf8String.toBits(e)),o=o||f.misc.hmac,t=new o(t);var a,s,c,h,d=[],u=f.bitArray;for(h=1;32*d.length<(r||1);h++){for(o=a=t.encrypt(u.concat(e,[h])),s=1;n>s;s++)for(a=t.encrypt(a),c=0;c<a.length;c++)o[c]^=a[c];d=d.concat(o)}return r&&(d=u.clamp(d,r)),d},f.prng=function(t){this.c=[new f.hash.sha256],this.i=[0],this.F=0,this.s={},this.C=0,this.K={},this.O=this.d=this.j=this.W=0,this.b=[0,0,0,0,0,0,0,0],this.f=[0,0,0,0],this.A=l,this.B=t,this.q=p,this.w={progress:{},seeded:{}},this.m=this.V=0,this.t=1,this.u=2,this.S=65536,this.I=[0,48,64,96,128,192,256,384,512,768,1024],this.T=3e4,this.R=80},f.prng.prototype={randomWords:function(t,e){var n,r=[];n=this.isReady(e);var o;if(n===this.m&&i(new f.exception.notReady("generator isn't seeded")),n&this.u){n=!(n&this.t),o=[];var a,s=0;for(this.O=o[0]=(new Date).valueOf()+this.T,a=0;16>a;a++)o.push(4294967296*Math.random()|0);for(a=0;a<this.c.length&&(o=o.concat(this.c[a].finalize()),s+=this.i[a],this.i[a]=0,!(!n&&this.F&1<<a));a++);for(this.F>=1<<this.c.length&&(this.c.push(new f.hash.sha256),this.i.push(0)),this.d-=s,s>this.j&&(this.j=s),this.F++,this.b=f.hash.sha256.hash(this.b.concat(o)),this.A=new f.cipher.aes(this.b),n=0;4>n&&(this.f[n]=this.f[n]+1|0,!this.f[n]);n++);}for(n=0;t>n;n+=4)0===(n+1)%this.S&&h(this),o=d(this),r.push(o[0],o[1],o[2],o[3]);return h(this),r.slice(0,t)},setDefaultParanoia:function(t,e){0===t&&"Setting paranoia=0 will ruin your security; use it only for testing"!==e&&i("Setting paranoia=0 will ruin your security; use it only for testing"),this.B=t},addEntropy:function(t,e,n){n=n||"user";var r,o,a=(new Date).valueOf(),c=this.s[n],h=this.isReady(),d=0;switch(r=this.K[n],r===l&&(r=this.K[n]=this.W++),c===l&&(c=this.s[n]=0),this.s[n]=(this.s[n]+1)%this.c.length,typeof t){case"number":e===l&&(e=1),this.c[c].update([r,this.C++,1,e,a,1,0|t]);break;case"object":if(n=Object.prototype.toString.call(t),"[object Uint32Array]"===n){for(o=[],n=0;n<t.length;n++)o.push(t[n]);t=o}else for("[object Array]"!==n&&(d=1),n=0;n<t.length&&!d;n++)"number"!=typeof t[n]&&(d=1);if(!d){if(e===l)for(n=e=0;n<t.length;n++)for(o=t[n];o>0;)e++,o>>>=1;this.c[c].update([r,this.C++,2,e,a,t.length].concat(t))}break;case"string":e===l&&(e=t.length),this.c[c].update([r,this.C++,3,e,a,t.length]),this.c[c].update(t);break;default:d=1}d&&i(new f.exception.bug("random: addEntropy only supports number, array of numbers or string")),this.i[c]+=e,this.d+=e,h===this.m&&(this.isReady()!==this.m&&s("seeded",Math.max(this.j,this.d)),s("progress",this.getProgress()))},isReady:function(t){return t=this.I[t!==l?t:this.B],this.j&&this.j>=t?this.i[0]>this.R&&(new Date).valueOf()>this.O?this.u|this.t:this.t:this.d>=t?this.u|this.m:this.m},getProgress:function(t){return t=this.I[t?t:this.B],this.j>=t?1:this.d>t?1:this.d/t},startCollectors:function(){this.q||(this.a={loadTimeCollector:u(this,this.aa),mouseCollector:u(this,this.ba),keyboardCollector:u(this,this.$),accelerometerCollector:u(this,this.U),touchCollector:u(this,this.da)},window.addEventListener?(window.addEventListener("load",this.a.loadTimeCollector,p),window.addEventListener("mousemove",this.a.mouseCollector,p),window.addEventListener("keypress",this.a.keyboardCollector,p),window.addEventListener("devicemotion",this.a.accelerometerCollector,p),window.addEventListener("touchmove",this.a.touchCollector,p)):document.attachEvent?(document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)):i(new f.exception.bug("can't attach event")),this.q=!0)},stopCollectors:function(){this.q&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,p),window.removeEventListener("mousemove",this.a.mouseCollector,p),window.removeEventListener("keypress",this.a.keyboardCollector,p),window.removeEventListener("devicemotion",this.a.accelerometerCollector,p),window.removeEventListener("touchmove",this.a.touchCollector,p)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.q=p)},addEventListener:function(t,e){this.w[t][this.V++]=e},removeEventListener:function(t,e){var n,r,i=this.w[t],o=[];for(r in i)i.hasOwnProperty(r)&&i[r]===e&&o.push(r);for(n=0;n<o.length;n++)r=o[n],delete i[r]},$:function(){c(1)},ba:function(t){var e,n;try{e=t.x||t.clientX||t.offsetX||0,n=t.y||t.clientY||t.offsetY||0}catch(r){n=e=0}0!=e&&0!=n&&f.random.addEntropy([e,n],2,"mouse"),c(0)},da:function(t){t=t.touches[0]||t.changedTouches[0],f.random.addEntropy([t.pageX||t.clientX,t.pageY||t.clientY],1,"touch"),c(0)},aa:function(){c(2)},U:function(t){if(t=t.accelerationIncludingGravity.x||t.accelerationIncludingGravity.y||t.accelerationIncludingGravity.z,window.orientation){var e=window.orientation;"number"==typeof e&&f.random.addEntropy(e,1,"accelerometer")}t&&f.random.addEntropy(t,2,"accelerometer"),c(0)}},f.random=new f.prng(6);t:try{var m,y,g,v;if(v="undefined"!=typeof n){var b;if(b=n.exports){var w;try{w=e("crypto")}catch(E){w=null}b=(y=w)&&y.randomBytes}v=b}if(v)m=y.randomBytes(128),m=new Uint32Array(new Uint8Array(m).buffer),f.random.addEntropy(m,1024,"crypto['randomBytes']");else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(g=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(g);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break t;window.msCrypto.getRandomValues(g)}f.random.addEntropy(g,1024,"crypto['getRandomValues']")}}catch(A){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(A))}f.json={defaults:{v:1,iter:1e3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},Y:function(t,e,n,r){n=n||{},r=r||{};var o,a=f.json,s=a.e({iv:f.random.randomWords(4,0)},a.defaults);return a.e(s,n),n=s.adata,"string"==typeof s.salt&&(s.salt=f.codec.base64.toBits(s.salt)),"string"==typeof s.iv&&(s.iv=f.codec.base64.toBits(s.iv)),(!f.mode[s.mode]||!f.cipher[s.cipher]||"string"==typeof t&&100>=s.iter||64!==s.ts&&96!==s.ts&&128!==s.ts||128!==s.ks&&192!==s.ks&&256!==s.ks||2>s.iv.length||4<s.iv.length)&&i(new f.exception.invalid("json encrypt: invalid parameters")),"string"==typeof t?(o=f.misc.cachedPbkdf2(t,s),t=o.key.slice(0,s.ks/32),s.salt=o.salt):f.ecc&&t instanceof f.ecc.elGamal.publicKey&&(o=t.kem(),s.kemtag=o.tag,t=o.key.slice(0,s.ks/32)),"string"==typeof e&&(e=f.codec.utf8String.toBits(e)),"string"==typeof n&&(s.adata=n=f.codec.utf8String.toBits(n)),o=new f.cipher[s.cipher](t),a.e(r,s),r.key=t,s.ct=f.mode[s.mode].encrypt(o,e,s.iv,n,s.ts),s},encrypt:function(t,e,n,r){var i=f.json,o=i.Y.apply(i,arguments);return i.encode(o)},X:function(t,e,n,r){n=n||{},r=r||{};var o=f.json;e=o.e(o.e(o.e({},o.defaults),e),n,!0);var a,s;return a=e.adata,"string"==typeof e.salt&&(e.salt=f.codec.base64.toBits(e.salt)),"string"==typeof e.iv&&(e.iv=f.codec.base64.toBits(e.iv)),(!f.mode[e.mode]||!f.cipher[e.cipher]||"string"==typeof t&&100>=e.iter||64!==e.ts&&96!==e.ts&&128!==e.ts||128!==e.ks&&192!==e.ks&&256!==e.ks||!e.iv||2>e.iv.length||4<e.iv.length)&&i(new f.exception.invalid("json decrypt: invalid parameters")),"string"==typeof t?(s=f.misc.cachedPbkdf2(t,e),t=s.key.slice(0,e.ks/32),e.salt=s.salt):f.ecc&&t instanceof f.ecc.elGamal.secretKey&&(t=t.unkem(f.codec.base64.toBits(e.kemtag)).slice(0,e.ks/32)),"string"==typeof a&&(a=f.codec.utf8String.toBits(a)),s=new f.cipher[e.cipher](t),a=f.mode[e.mode].decrypt(s,e.ct,e.iv,a,e.ts),o.e(r,e),r.key=t,1===n.raw?a:f.codec.utf8String.fromBits(a)},decrypt:function(t,e,n,r){var i=f.json;return i.X(t,i.decode(e),n,r)},encode:function(t){var e,n="{",r="";for(e in t)if(t.hasOwnProperty(e))switch(e.match(/^[a-z0-9]+$/i)||i(new f.exception.invalid("json encode: invalid property name")),n+=r+'"'+e+'":',r=",",typeof t[e]){case"number":case"boolean":n+=t[e];break;case"string":n+='"'+escape(t[e])+'"';break;case"object":n+='"'+f.codec.base64.fromBits(t[e],0)+'"';break;default:i(new f.exception.bug("json encode: unsupported type"))}return n+"}"},decode:function(t){t=t.replace(/\s/g,""),t.match(/^\{.*\}$/)||i(new f.exception.invalid("json decode: this isn't json!")),t=t.replace(/^\{|\}$/g,"").split(/,/);var e,n,r={};for(e=0;e<t.length;e++)(n=t[e].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i))||i(new f.exception.invalid("json decode: this isn't json!")),n[3]?r[n[2]]=parseInt(n[3],10):n[4]?r[n[2]]=n[2].match(/^(ct|adata|salt|iv)$/)?f.codec.base64.toBits(n[4]):unescape(n[4]):n[5]&&(r[n[2]]="true"===n[5]);return r},e:function(t,e,n){if(t===l&&(t={}),e===l)return t;for(var r in e)e.hasOwnProperty(r)&&(n&&t[r]!==l&&t[r]!==e[r]&&i(new f.exception.invalid("required parameter overridden")),t[r]=e[r]);return t},fa:function(t,e){var n,r={};for(n in t)t.hasOwnProperty(n)&&t[n]!==e[n]&&(r[n]=t[n]);return r},ea:function(t,e){var n,r={};for(n=0;n<e.length;n++)t[e[n]]!==l&&(r[e[n]]=t[e[n]]);return r}},f.encrypt=f.json.encrypt,f.decrypt=f.json.decrypt,f.misc.ca={},f.misc.cachedPbkdf2=function(t,e){var n,r=f.misc.ca;return e=e||{},n=e.iter||1e3,r=r[t]=r[t]||{},n=r[n]=r[n]||{firstSalt:e.salt&&e.salt.length?e.salt.slice(0):f.random.randomWords(2,0)},r=e.salt===l?n.firstSalt:e.salt,n[r]=n[r]||f.misc.pbkdf2(t,r,e.iter),{key:n[r].slice(0),salt:r.slice(0)}}},{crypto:1}],3:[function(t,e,n){"use strict";var r=t("../lib/error");e.exports={DATA_COLLECTOR_KOUNT_NOT_ENABLED:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_KOUNT_NOT_ENABLED",message:"Kount is not enabled for this merchant."},DATA_COLLECTOR_KOUNT_ERROR:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_KOUNT_ERROR"},DATA_COLLECTOR_PAYPAL_NOT_ENABLED:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_PAYPAL_NOT_ENABLED",message:"PayPal is not enabled for this merchant."},DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS:{type:r.types.MERCHANT,code:"DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS",message:"Data Collector must be created with Kount and/or PayPal."}}},{"../lib/error":11}],4:[function(t,e,n){"use strict";function r(){return new i}function i(){this.sessionId=o(),this._beaconId=a(this.sessionId),this._parameterBlock=s(this.sessionId,this._beaconId),this._thirdPartyBlock=c()}function o(){var t,e="";for(t=0;32>t;t++)e+=Math.floor(16*Math.random()).toString(16);return e}function a(t){var e=(new Date).getTime()/1e3;return"https://b.stats.paypal.com/counter.cgi?i=127.0.0.1&p="+t+"&t="+e+"&a=14"}function s(t,e){var n=document.body.appendChild(document.createElement("script"));return n.type="application/json",n.setAttribute("fncls","fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99"),n.text=JSON.stringify({f:t,s:"BRAINTREE_SIGNIN",b:e}),n}function c(){function t(){n._l()}var e,n,r="https://www.paypalobjects.com/webstatic/r/fb/",i=document.createElement("iframe");i.src="about:blank",i.title="",i.role="presentation",(i.frameElement||i).style.cssText="width: 0; height: 0; border: 0",document.body.appendChild(i);try{n=i.contentWindow.document}catch(o){e=document.domain,i.src='javascript:var d=document.open();d.domain="'+e+'";void(0);',n=i.contentWindow.document}return n.open()._l=function(){var t=this.createElement("script");e&&(this.domain=e),t.id="js-iframe-async",t.src=r+"fb-all-prod.pp.min.js",this.body.appendChild(t)},i.addEventListener?i.addEventListener("load",t,!1):i.attachEvent?i.attachEvent("onload",t):n.write('<body onload="document._l();">'),n.close(),i}i.prototype.teardown=function(){this._thirdPartyBlock.parentNode.removeChild(this._thirdPartyBlock)},e.exports={setup:r}},{}],5:[function(t,e,n){"use strict";function r(t,e){function n(t){var e;for(e=0;e<v.length;e++)v[e].teardown();c(m,s(m)),t&&(t=h(t))()}var r,p,f,m,y,g,v=[];if("function"!=typeof e)throw new a({type:u.CALLBACK_REQUIRED.type,code:u.CALLBACK_REQUIRED.code,message:"create must include a callback function."});if(e=h(e),null==t.client)return void e(new a({type:u.INSTANTIATION_OPTION_REQUIRED.type,code:u.INSTANTIATION_OPTION_REQUIRED.code,message:"options.client is required when instantiating Data Collector."}));if(y=t.client.getConfiguration(),g=y.analyticsMetadata.sdkVersion,g!==d)return void e(new a({type:u.INCOMPATIBLE_VERSIONS.type,code:u.INCOMPATIBLE_VERSIONS.code,message:"Client (version "+g+") and Data Collector (version "+d+") components must be from the same SDK version."}));if(t.kount===!0){if(!y.gatewayConfiguration.kount)return void e(new a(l.DATA_COLLECTOR_KOUNT_NOT_ENABLED));try{p=i.setup({environment:y.gatewayConfiguration.environment,merchantId:y.gatewayConfiguration.kount.kountMerchantId})}catch(b){return void e(new a({type:l.DATA_COLLECTOR_KOUNT_ERROR.type,code:l.DATA_COLLECTOR_KOUNT_ERROR.code,message:b.message}))}r=p.deviceData,v.push(p)}else r={};if(t.paypal===!0){if(y.gatewayConfiguration.paypalEnabled!==!0)return void e(new a(l.DATA_COLLECTOR_PAYPAL_NOT_ENABLED));f=o.setup(),r.correlation_id=f.sessionId,v.push(f)}return 0===v.length?void e(new a(l.DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS)):(m={deviceData:JSON.stringify(r),teardown:n},void e(null,m))}var i=t("./kount"),o=t("./fraudnet"),a=t("../lib/error"),s=t("../lib/methods"),c=t("../lib/convert-methods-to-error"),h=t("../lib/deferred"),d="3.0.1",u=t("../errors"),l=t("./errors");e.exports={create:r,VERSION:d}},{"../errors":7,"../lib/convert-methods-to-error":8,"../lib/deferred":9,"../lib/error":11,"../lib/methods":12,"./errors":3,"./fraudnet":4,"./kount":6}],6:[function(t,e,n){"use strict";function r(t){var e=null!=t?t:{};return new i(e)}function i(t){o.random.startCollectors(),this._currentEnvironment=this._initializeEnvironment(t),this._deviceSessionId=this._generateDeviceSessionId(),this.deviceData=this._getDeviceData(),this._iframe=this._setupIFrame()}var o=t("sjcl"),a="https://assets.qa.braintreepayments.com/data",s="braintreeDataFrame",c={development:a,qa:a,sandbox:"https://assets.braintreegateway.com/sandbox/data",production:"https://assets.braintreegateway.com/data"};i.prototype.teardown=function(){o.random.stopCollectors(),this._removeIframe()},i.prototype._removeIframe=function(){this._iframe.parentNode.removeChild(this._iframe)},i.prototype._getDeviceData=function(){return{device_session_id:this._deviceSessionId,fraud_merchant_id:this._currentEnvironment.id}},i.prototype._generateDeviceSessionId=function(){var t,e;return t=o.random.randomWords(4,0),e=o.codec.hex.fromBits(t)},i.prototype._setupIFrame=function(){var t,e=this,n=document.getElementById(s);return null!=n?n:(t="?m="+this._currentEnvironment.id+"&s="+this._deviceSessionId,n=document.createElement("iframe"),n.width=1,n.id=s,n.height=1,n.frameBorder=0,n.scrolling="no",document.body.appendChild(n),setTimeout(function(){n.src=e._currentEnvironment.url+"/logo.htm"+t,n.innerHTML='<img src="'+e._currentEnvironment.url+"/logo.gif"+t+'" />'},10),n)},i.prototype._initializeEnvironment=function(t){var e=c[t.environment];if(null==e)throw new Error(t.environment+" is not a valid environment for kount.environment");return{url:e,name:t.environment,id:t.merchantId}},e.exports={setup:r,Kount:i,environmentUrls:c}},{sjcl:2}],7:[function(t,e,n){"use strict";var r=t("./lib/error");e.exports={CALLBACK_REQUIRED:{type:r.types.MERCHANT,code:"CALLBACK_REQUIRED"},INSTANTIATION_OPTION_REQUIRED:{type:r.types.MERCHANT,code:"INSTANTIATION_OPTION_REQUIRED"},INCOMPATIBLE_VERSIONS:{type:r.types.MERCHANT,code:"INCOMPATIBLE_VERSIONS"},METHOD_CALLED_AFTER_TEARDOWN:{type:r.types.MERCHANT,code:"METHOD_CALLED_AFTER_TEARDOWN"}}},{"./lib/error":11}],8:[function(t,e,n){"use strict";var r=t("./error"),i=t("../errors");e.exports=function(t,e){e.forEach(function(e){t[e]=function(){throw new r({type:i.METHOD_CALLED_AFTER_TEARDOWN.type,code:i.METHOD_CALLED_AFTER_TEARDOWN.code,message:e+" cannot be called after teardown."})}})}},{"../errors":7,"./error":11}],9:[function(t,e,n){"use strict";e.exports=function(t){return function(){var e=arguments;setTimeout(function(){t.apply(null,e)},1)}}},{}],10:[function(t,e,n){"use strict";function r(t,e){return e=null==e?"":e,t.reduce(function(t,n){return t[n]=e+n,t},{})}e.exports=r},{}],11:[function(t,e,n){"use strict";function r(t){if(!r.types.hasOwnProperty(t.type))throw new Error(t.type+" is not a valid type.");if(!t.code)throw new Error("Error code required.");if(!t.message)throw new Error("Error message required.");this.name="BraintreeError",this.code=t.code,this.message=t.message,this.type=t.type,this.details=t.details}var i=t("./enumerate");r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.types=i(["CUSTOMER","MERCHANT","NETWORK","INTERNAL","UNKNOWN"]),e.exports=r},{"./enumerate":10}],12:[function(t,e,n){"use strict";e.exports=function(t){return Object.keys(t).filter(function(e){return"function"==typeof t[e]})}},{}]},{},[5])(5)});
