/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var cannon_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cannon-es */ "./node_modules/cannon-es/dist/cannon-es.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
// 22FI023
// 大竹里佳
// 最終課題



class ThreeJSContainer {
    scene; // Three,jsのシーン
    light; // シーン内の光源
    world; // CANNON.jsの物理世界
    coins = []; // コインの配列
    carBody; // 車の物理ボディ
    clearSprite = null; // 「Clear！」メッセージのスプライト
    constructor() {
        // 空のコンストラクタ
    }
    // レンダラーとカメラを作成し、COMに追加するメソッド
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x495ed)); // 背景色
        renderer.shadowMap.enabled = true; // シャドウマッピングを有効にする
        const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos); // カメラ位置の設定
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0)); // カメラの向きを設定
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement); // カメラ操作用のコントロールを追加
        this.createScene(); // シーンの作成
        // レンダリングループ
        const render = (time) => {
            orbitControls.update(); // カメラコントロールの更新
            renderer.render(this.scene, camera); // シーンの描画
            requestAnimationFrame(render); // 次のフレームをリクエスト
        };
        requestAnimationFrame(render);
        // レンダラーのスタイル設定
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成
    createScene = () => {
        this.world = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.World({ gravity: new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, -9.82, 0) });
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        // ディフォルトの接触材質の設定
        this.world.defaultContactMaterial.restitution = 0.9;
        this.world.defaultContactMaterial.friction = 0.03;
        // 車の物理ボディの作成
        this.carBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 5 });
        const carBodyShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Box(new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(4, 0.5, 2));
        this.carBody.addShape(carBodyShape);
        this.carBody.position.y = 1;
        const vehicle = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.RigidVehicle({ chassisBody: this.carBody });
        // 車のタイヤの物理ボディの作成
        const wheelShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Sphere(1);
        const frontLeftWheelBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 1 });
        frontLeftWheelBody.addShape(wheelShape);
        frontLeftWheelBody.angularDamping = 0.4;
        const frontRightWheelBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 1 });
        frontRightWheelBody.addShape(wheelShape);
        frontRightWheelBody.angularDamping = 0.4;
        const backLeftWheelBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 1 });
        backLeftWheelBody.addShape(wheelShape);
        backLeftWheelBody.angularDamping = 0.4;
        const backRightWheelBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 1 });
        backRightWheelBody.addShape(wheelShape);
        backRightWheelBody.angularDamping = 0.4;
        // 車にタイヤを追加
        // 左前
        vehicle.addWheel({
            body: frontLeftWheelBody,
            position: new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(-2, 0, 2.5)
        });
        // 右前
        vehicle.addWheel({
            body: frontRightWheelBody,
            position: new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(-2, 0, -2.5)
        });
        // 左後ろ
        vehicle.addWheel({
            body: backLeftWheelBody,
            position: new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(2, 0, 2.5)
        });
        // 右後ろ
        vehicle.addWheel({
            body: backRightWheelBody,
            position: new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Vec3(2, 0, -2.5)
        });
        vehicle.addToWorld(this.world); // 車を物理世界に追加
        // 車のメッシュとタイヤのメッシュを作成してシーンに追加
        const boxGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(8, 1, 4);
        const boxMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffffff }); // 例えば白色
        const boxMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(boxGeometry, boxMaterial);
        this.scene.add(boxMesh);
        const wheelGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(1);
        // グレーに設定
        const wheelMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0x808080 });
        const frontLeftMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(wheelGeometry, wheelMaterial);
        this.scene.add(frontLeftMesh);
        const frontRightMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(wheelGeometry, wheelMaterial);
        this.scene.add(frontRightMesh);
        const backLeftMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(wheelGeometry, wheelMaterial);
        this.scene.add(backLeftMesh);
        const backRightMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(wheelGeometry, wheelMaterial);
        this.scene.add(backRightMesh);
        // 平面を作成してシーンに追加
        const phongMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x808080 });
        const planeWidth = 100;
        const planeHeight = 100;
        const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(planeWidth, planeHeight);
        const planeMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(planeGeometry, phongMaterial);
        planeMesh.material.side = three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide;
        planeMesh.rotateX(-Math.PI / 2);
        this.scene.add(planeMesh);
        const planeShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Plane();
        const planeBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 0 });
        planeBody.addShape(planeShape);
        planeBody.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z);
        planeBody.quaternion.set(planeMesh.quaternion.x, planeMesh.quaternion.y, planeMesh.quaternion.z, planeMesh.quaternion.w);
        this.world.addBody(planeBody);
        this.createCoin(); // コインの作成
        let forward = 0; // 車の前進・後退の力
        let turn = 0; // 車の旋回の角度
        // 力とステアリングの設定
        const setForceAndSteering = () => {
            const maxForce = 50;
            const maxSteerValue = Math.PI / 8;
            vehicle.setWheelForce(forward * maxForce, 2);
            vehicle.setWheelForce(forward * maxForce, 3);
            vehicle.setSteeringValue(turn * maxSteerValue, 0);
            vehicle.setSteeringValue(turn * maxSteerValue, 1);
            if (forward === 0) {
                vehicle.setWheelForce(0, 2);
                vehicle.setWheelForce(0, 3);
            }
            if (turn === 0) {
                vehicle.setSteeringValue(0, 0);
                vehicle.setSteeringValue(0, 1);
            }
        };
        // キーイベントによる車の操作
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    forward = 1;
                    break;
                case 'ArrowDown':
                    forward = -1;
                    break;
                case 'ArrowLeft':
                    turn = 1;
                    break;
                case 'ArrowRight':
                    turn = -1;
                    break;
            }
            setForceAndSteering();
        });
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    forward = 0;
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    turn = 0;
                    break;
            }
            setForceAndSteering();
        });
        // 光源の設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.PointLight(0xffffff, 1, 25);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3().copy(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 2, 1).clone().normalize());
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // ワゴン車の荷物用の立方体
        const cargoWidth = 6; // 元の車の幅に合わせる
        const cargoHeight = 2; // 適当な高さ
        const cargoDepth = 4; // 元の車の奥行きに合わせる
        const cargoMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffffff }); // 例えば白色
        const cargoGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(cargoWidth, cargoHeight, cargoDepth);
        const cargoMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(cargoGeometry, cargoMaterial);
        cargoMesh.position.set(1, 1.5, -4); // 車の後部に配置
        this.scene.add(cargoMesh);
        // アップデートループ
        let update = (time) => {
            this.world.fixedStep(); // 物理シミュレーションの固定ステップ
            // 車両の位置と回転をメッシュに適用
            boxMesh.position.set(this.carBody.position.x, this.carBody.position.y, this.carBody.position.z);
            boxMesh.quaternion.set(this.carBody.quaternion.x, this.carBody.quaternion.y, this.carBody.quaternion.z, this.carBody.quaternion.w);
            frontLeftMesh.position.set(frontLeftWheelBody.position.x, frontLeftWheelBody.position.y, frontLeftWheelBody.position.z);
            frontLeftMesh.quaternion.set(frontLeftWheelBody.quaternion.x, frontLeftWheelBody.quaternion.y, frontLeftWheelBody.quaternion.z, frontLeftWheelBody.quaternion.w);
            frontRightMesh.position.set(frontRightWheelBody.position.x, frontRightWheelBody.position.y, frontRightWheelBody.position.z);
            frontRightMesh.quaternion.set(frontRightWheelBody.quaternion.x, frontRightWheelBody.quaternion.y, frontRightWheelBody.quaternion.z, frontRightWheelBody.quaternion.w);
            backLeftMesh.position.set(backLeftWheelBody.position.x, backLeftWheelBody.position.y, backLeftWheelBody.position.z);
            backLeftMesh.quaternion.set(backLeftWheelBody.quaternion.x, backLeftWheelBody.quaternion.y, backLeftWheelBody.quaternion.z, backLeftWheelBody.quaternion.w);
            backRightMesh.position.set(backRightWheelBody.position.x, backRightWheelBody.position.y, backRightWheelBody.position.z);
            backRightMesh.quaternion.set(backRightWheelBody.quaternion.x, backRightWheelBody.quaternion.y, backRightWheelBody.quaternion.z, backRightWheelBody.quaternion.w);
            // 荷物の位置と回転を車両に合わせる
            cargoMesh.position.set(this.carBody.position.x + 1, this.carBody.position.y + 1.5, this.carBody.position.z);
            cargoMesh.quaternion.set(this.carBody.quaternion.x, this.carBody.quaternion.y, this.carBody.quaternion.z, this.carBody.quaternion.w);
            // コインの動きと衝突判定
            for (const coin of this.coins) {
                coin.body.position.x += coin.direction.x * coin.speed;
                coin.body.position.z += coin.direction.z * coin.speed;
                coin.mesh.position.set(coin.body.position.x, coin.body.position.y, coin.body.position.z);
                if (coin.body.position.x < -20 || coin.body.position.x > 20) {
                    coin.direction.x *= -1;
                }
                if (coin.body.position.z < -20 || coin.body.position.z > 20) {
                    coin.direction.z *= -1;
                }
            }
            // コインと車の衝突判定
            if (this.coins.length > 0) {
                const coin = this.coins[0];
                const distance = this.carBody.position.distanceTo(coin.body.position);
                if (distance < 1) {
                    this.scene.remove(coin.mesh);
                    this.world.removeBody(coin.body);
                    this.coins = [];
                    this.showClearMessage(); // 「Clear！」メッセージを表示
                }
            }
            requestAnimationFrame(update); // 次のフレームをリクエスト
        };
        requestAnimationFrame(update);
    };
    // コインを作成するメソッド
    createCoin = () => {
        const coinGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(1);
        const coinMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffff00 }); // 黄色に設定
        const coinMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(coinGeometry, coinMaterial);
        const x = Math.random() * 40 - 20;
        const z = Math.random() * 40 - 20;
        coinMesh.position.set(x, 0.5, z);
        this.scene.add(coinMesh);
        const coinShape = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Sphere(0.5);
        const coinBody = new cannon_es__WEBPACK_IMPORTED_MODULE_2__.Body({ mass: 0.1 });
        coinBody.addShape(coinShape);
        coinBody.position.set(x, 0.5, z);
        this.world.addBody(coinBody);
        const direction = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).clone().normalize();
        const speed = 0.02;
        this.coins.push({ mesh: coinMesh, body: coinBody, direction: direction, speed: speed });
        // コインと車の衝突イベント
        this.world.addEventListener('beginContact', (event) => {
            const bodyA = event.bodyA;
            const bodyB = event.bodyB;
            if ((bodyA === coinBody && bodyB === this.carBody) || (bodyB === coinBody && bodyA === this.carBody)) {
                this.scene.remove(coinMesh);
                this.world.removeBody(coinBody);
                this.coins = [];
                this.showClearMessage(); // 「Clear！」メッセージを表示
            }
        });
    };
    // メッセージ用のテキストスプライトを作成するメソッド
    createTextSprite = (message) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context)
            return;
        // キャンバスサイズの設定
        const canvasWidth = 300; // 幅を適切なサイズに設定
        const canvasHeight = 150; // 高さを適切なサイズに設定
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        // フォントサイズとスタイルの設定
        context.font = '60px Arial'; // フォントサイズを大きく設定
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle'; // テキストの垂直方向の中央揃え
        context.fillText(message, canvasWidth / 2, canvasHeight / 2);
        const texture = new three__WEBPACK_IMPORTED_MODULE_1__.CanvasTexture(canvas);
        const spriteMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.SpriteMaterial({ map: texture });
        const sprite = new three__WEBPACK_IMPORTED_MODULE_1__.Sprite(spriteMaterial);
        // スプライトのスケールをキャンバスサイズに合わせて調整
        sprite.scale.set(canvasWidth / 10, canvasHeight / 10, 1);
        sprite.position.set(0, 5, 0);
        this.scene.add(sprite);
        this.clearSprite = sprite;
    };
    // 「Clear！」メッセージを表示するメソッド
    showClearMessage = () => {
        if (this.clearSprite) {
            this.scene.remove(this.clearSprite);
        }
        this.createTextSprite("Clear!");
    };
}
// DOMContentLoaded イベントで初期化関数を呼び出す
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer(); // ThreeJSContainerのインスタンスを作成
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(25, 25, 25)); // レンダラーとカメラの作成
    document.body.appendChild(viewport); // レンダラーをDOMに追加
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_cannon-es_dist_cannon-es_js-node_modules_three_examples_jsm_controls_Orb-e58bd2"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDIyRkkwMjNcbi8vIOWkp+eruemHjOS9s1xuLy8g5pyA57WC6Kqy6aGMXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0ICogYXMgQ0FOTk9OIGZyb20gJ2Nhbm5vbi1lcyc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XG5cbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xuICAgIHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lOyAgICAvLyBUaHJlZSxqc+OBruOCt+ODvOODs1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0OyAgICAvLyDjgrfjg7zjg7PlhoXjga7lhYnmupBcbiAgICBwcml2YXRlIHdvcmxkOiBDQU5OT04uV29ybGQ7ICAgLy8gQ0FOTk9OLmpz44Gu54mp55CG5LiW55WMXG4gICAgcHJpdmF0ZSBjb2luczogeyBtZXNoOiBUSFJFRS5NZXNoLCBib2R5OiBDQU5OT04uQm9keSwgZGlyZWN0aW9uOiBUSFJFRS5WZWN0b3IzLCBzcGVlZDogbnVtYmVyIH1bXSA9IFtdOyAgLy8g44Kz44Kk44Oz44Gu6YWN5YiXXG4gICAgcHJpdmF0ZSBjYXJCb2R5OiBDQU5OT04uQm9keTsgIC8vIOi7iuOBrueJqeeQhuODnOODh+OCo1xuICAgIHByaXZhdGUgY2xlYXJTcHJpdGU6IFRIUkVFLlNwcml0ZSB8IG51bGwgPSBudWxsOyAvLyDjgIxDbGVhcu+8geOAjeODoeODg+OCu+ODvOOCuOOBruOCueODl+ODqeOCpOODiFxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIOepuuOBruOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgIH1cblxuICAgIC8vIOODrOODs+ODgOODqeODvOOBqOOCq+ODoeODqeOCkuS9nOaIkOOBl+OAgUNPTeOBq+i/veWKoOOBmeOCi+ODoeOCveODg+ODiVxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHg0OTVlZCkpOyAgLy8g6IOM5pmv6ImyXG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgICAgICAgICAgICAgICAgIC8vIOOCt+ODo+ODieOCpuODnuODg+ODlOODs+OCsOOCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7ICAgICAgICAgICAgICAgICAgIC8vIOOCq+ODoeODqeS9jee9ruOBruioreWumlxuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTsgICAgICAgICAvLyDjgqvjg6Hjg6njga7lkJHjgY3jgpLoqK3lrppcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTsgIC8vIOOCq+ODoeODqeaTjeS9nOeUqOOBruOCs+ODs+ODiOODreODvOODq+OCkui/veWKoFxuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTsgICAgLy8g44K344O844Oz44Gu5L2c5oiQXG5cbiAgICAgICAgLy8g44Os44Oz44OA44Oq44Oz44Kw44Or44O844OXXG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKTsgICAvLyDjgqvjg6Hjg6njgrPjg7Pjg4jjg63jg7zjg6vjga7mm7TmlrBcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCBjYW1lcmEpOyAgICAvLyDjgrfjg7zjg7Pjga7mj4/nlLtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpOyAgICAgICAgICAvLyDmrKHjga7jg5Xjg6zjg7zjg6DjgpLjg6rjgq/jgqjjgrnjg4hcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICAvLyDjg6zjg7Pjg4Djg6njg7zjga7jgrnjgr/jgqTjg6voqK3lrppcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLm1hcmdpbiA9IFwiMTBweFwiO1xuICAgICAgICByZXR1cm4gcmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyDjgrfjg7zjg7Pjga7kvZzmiJBcbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLndvcmxkID0gbmV3IENBTk5PTi5Xb3JsZCh7IGdyYXZpdHk6IG5ldyBDQU5OT04uVmVjMygwLCAtOS44MiwgMCkgfSk7XG5cbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgICAgIC8vIOODh+OCo+ODleOCqeODq+ODiOOBruaOpeinpuadkOizquOBruioreWumlxuICAgICAgICB0aGlzLndvcmxkLmRlZmF1bHRDb250YWN0TWF0ZXJpYWwucmVzdGl0dXRpb24gPSAwLjk7XG4gICAgICAgIHRoaXMud29ybGQuZGVmYXVsdENvbnRhY3RNYXRlcmlhbC5mcmljdGlvbiA9IDAuMDM7XG5cbiAgICAgICAgLy8g6LuK44Gu54mp55CG44Oc44OH44Kj44Gu5L2c5oiQXG4gICAgICAgIHRoaXMuY2FyQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDUgfSk7XG5cbiAgICAgICAgY29uc3QgY2FyQm9keVNoYXBlID0gbmV3IENBTk5PTi5Cb3gobmV3IENBTk5PTi5WZWMzKDQsIDAuNSwgMikpO1xuICAgICAgICB0aGlzLmNhckJvZHkuYWRkU2hhcGUoY2FyQm9keVNoYXBlKTtcbiAgICAgICAgdGhpcy5jYXJCb2R5LnBvc2l0aW9uLnkgPSAxO1xuXG4gICAgICAgIGNvbnN0IHZlaGljbGUgPSBuZXcgQ0FOTk9OLlJpZ2lkVmVoaWNsZSh7IGNoYXNzaXNCb2R5OiB0aGlzLmNhckJvZHkgfSk7XG5cbiAgICAgICAgLy8g6LuK44Gu44K/44Kk44Ok44Gu54mp55CG44Oc44OH44Kj44Gu5L2c5oiQXG4gICAgICAgIGNvbnN0IHdoZWVsU2hhcGUgPSBuZXcgQ0FOTk9OLlNwaGVyZSgxKTtcbiAgICAgICAgY29uc3QgZnJvbnRMZWZ0V2hlZWxCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMSB9KTtcbiAgICAgICAgZnJvbnRMZWZ0V2hlZWxCb2R5LmFkZFNoYXBlKHdoZWVsU2hhcGUpO1xuICAgICAgICBmcm9udExlZnRXaGVlbEJvZHkuYW5ndWxhckRhbXBpbmcgPSAwLjQ7XG4gICAgICAgIGNvbnN0IGZyb250UmlnaHRXaGVlbEJvZHkgPSBuZXcgQ0FOTk9OLkJvZHkoeyBtYXNzOiAxIH0pO1xuICAgICAgICBmcm9udFJpZ2h0V2hlZWxCb2R5LmFkZFNoYXBlKHdoZWVsU2hhcGUpO1xuICAgICAgICBmcm9udFJpZ2h0V2hlZWxCb2R5LmFuZ3VsYXJEYW1waW5nID0gMC40O1xuICAgICAgICBjb25zdCBiYWNrTGVmdFdoZWVsQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDEgfSk7XG4gICAgICAgIGJhY2tMZWZ0V2hlZWxCb2R5LmFkZFNoYXBlKHdoZWVsU2hhcGUpO1xuICAgICAgICBiYWNrTGVmdFdoZWVsQm9keS5hbmd1bGFyRGFtcGluZyA9IDAuNDtcbiAgICAgICAgY29uc3QgYmFja1JpZ2h0V2hlZWxCb2R5ID0gbmV3IENBTk5PTi5Cb2R5KHsgbWFzczogMSB9KTtcbiAgICAgICAgYmFja1JpZ2h0V2hlZWxCb2R5LmFkZFNoYXBlKHdoZWVsU2hhcGUpO1xuICAgICAgICBiYWNrUmlnaHRXaGVlbEJvZHkuYW5ndWxhckRhbXBpbmcgPSAwLjQ7XG5cbiAgICAgICAgLy8g6LuK44Gr44K/44Kk44Ok44KS6L+95YqgXG4gICAgICAgIC8vIOW3puWJjVxuICAgICAgICB2ZWhpY2xlLmFkZFdoZWVsKHtcbiAgICAgICAgICAgIGJvZHk6IGZyb250TGVmdFdoZWVsQm9keSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgQ0FOTk9OLlZlYzMoLTIsIDAsIDIuNSlcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWPs+WJjVxuICAgICAgICB2ZWhpY2xlLmFkZFdoZWVsKHtcbiAgICAgICAgICAgIGJvZHk6IGZyb250UmlnaHRXaGVlbEJvZHksXG4gICAgICAgICAgICBwb3NpdGlvbjogbmV3IENBTk5PTi5WZWMzKC0yLCAwLCAtMi41KVxuICAgICAgICB9KTtcbiAgICAgICAgLy8g5bem5b6M44KNXG4gICAgICAgIHZlaGljbGUuYWRkV2hlZWwoe1xuICAgICAgICAgICAgYm9keTogYmFja0xlZnRXaGVlbEJvZHksXG4gICAgICAgICAgICBwb3NpdGlvbjogbmV3IENBTk5PTi5WZWMzKDIsIDAsIDIuNSlcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWPs+W+jOOCjVxuICAgICAgICB2ZWhpY2xlLmFkZFdoZWVsKHtcbiAgICAgICAgICAgIGJvZHk6IGJhY2tSaWdodFdoZWVsQm9keSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgQ0FOTk9OLlZlYzMoMiwgMCwgLTIuNSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmVoaWNsZS5hZGRUb1dvcmxkKHRoaXMud29ybGQpOyAgLy8g6LuK44KS54mp55CG5LiW55WM44Gr6L+95YqgXG5cbiAgICAgICAgLy8g6LuK44Gu44Oh44OD44K344Ol44Go44K/44Kk44Ok44Gu44Oh44OD44K344Ol44KS5L2c5oiQ44GX44Gm44K344O844Oz44Gr6L+95YqgXG4gICAgICAgIGNvbnN0IGJveEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDgsIDEsIDQpO1xuICAgICAgICBjb25zdCBib3hNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTsgLy8g5L6L44GI44Gw55m96ImyXG4gICAgICAgIGNvbnN0IGJveE1lc2ggPSBuZXcgVEhSRUUuTWVzaChib3hHZW9tZXRyeSwgYm94TWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChib3hNZXNoKTtcblxuICAgICAgICBjb25zdCB3aGVlbEdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDEpO1xuICAgICAgICAvLyDjgrDjg6zjg7zjgavoqK3lrppcbiAgICAgICAgY29uc3Qgd2hlZWxNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDgwODA4MCB9KTtcblxuICAgICAgICBjb25zdCBmcm9udExlZnRNZXNoID0gbmV3IFRIUkVFLk1lc2god2hlZWxHZW9tZXRyeSwgd2hlZWxNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGZyb250TGVmdE1lc2gpO1xuXG4gICAgICAgIGNvbnN0IGZyb250UmlnaHRNZXNoID0gbmV3IFRIUkVFLk1lc2god2hlZWxHZW9tZXRyeSwgd2hlZWxNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGZyb250UmlnaHRNZXNoKTtcblxuICAgICAgICBjb25zdCBiYWNrTGVmdE1lc2ggPSBuZXcgVEhSRUUuTWVzaCh3aGVlbEdlb21ldHJ5LCB3aGVlbE1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYmFja0xlZnRNZXNoKTtcblxuICAgICAgICBjb25zdCBiYWNrUmlnaHRNZXNoID0gbmV3IFRIUkVFLk1lc2god2hlZWxHZW9tZXRyeSwgd2hlZWxNYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGJhY2tSaWdodE1lc2gpO1xuXG4gICAgICAgIC8vIOW5s+mdouOCkuS9nOaIkOOBl+OBpuOCt+ODvOODs+OBq+i/veWKoFxuICAgICAgICBjb25zdCBwaG9uZ01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4ODA4MDgwIH0pO1xuXG4gICAgICAgIGNvbnN0IHBsYW5lV2lkdGggPSAxMDA7XG4gICAgICAgIGNvbnN0IHBsYW5lSGVpZ2h0ID0gMTAwO1xuICAgICAgICBjb25zdCBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkocGxhbmVXaWR0aCwgcGxhbmVIZWlnaHQpO1xuICAgICAgICBjb25zdCBwbGFuZU1lc2ggPSBuZXcgVEhSRUUuTWVzaChwbGFuZUdlb21ldHJ5LCBwaG9uZ01hdGVyaWFsKTtcbiAgICAgICAgcGxhbmVNZXNoLm1hdGVyaWFsLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuICAgICAgICBwbGFuZU1lc2gucm90YXRlWCgtTWF0aC5QSSAvIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChwbGFuZU1lc2gpO1xuXG4gICAgICAgIGNvbnN0IHBsYW5lU2hhcGUgPSBuZXcgQ0FOTk9OLlBsYW5lKCk7XG4gICAgICAgIGNvbnN0IHBsYW5lQm9keSA9IG5ldyBDQU5OT04uQm9keSh7IG1hc3M6IDAgfSk7XG4gICAgICAgIHBsYW5lQm9keS5hZGRTaGFwZShwbGFuZVNoYXBlKTtcbiAgICAgICAgcGxhbmVCb2R5LnBvc2l0aW9uLnNldChwbGFuZU1lc2gucG9zaXRpb24ueCwgcGxhbmVNZXNoLnBvc2l0aW9uLnksIHBsYW5lTWVzaC5wb3NpdGlvbi56KTtcbiAgICAgICAgcGxhbmVCb2R5LnF1YXRlcm5pb24uc2V0KHBsYW5lTWVzaC5xdWF0ZXJuaW9uLngsIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLnksIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLnosIHBsYW5lTWVzaC5xdWF0ZXJuaW9uLncpO1xuICAgICAgICB0aGlzLndvcmxkLmFkZEJvZHkocGxhbmVCb2R5KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZUNvaW4oKTsgIC8vIOOCs+OCpOODs+OBruS9nOaIkFxuXG4gICAgICAgIGxldCBmb3J3YXJkID0gMDsgICAgLy8g6LuK44Gu5YmN6YCy44O75b6M6YCA44Gu5YqbXG4gICAgICAgIGxldCB0dXJuID0gMDsgICAgICAgLy8g6LuK44Gu5peL5Zue44Gu6KeS5bqmXG5cbiAgICAgICAgLy8g5Yqb44Go44K544OG44Ki44Oq44Oz44Kw44Gu6Kit5a6aXG4gICAgICAgIGNvbnN0IHNldEZvcmNlQW5kU3RlZXJpbmcgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXhGb3JjZSA9IDUwO1xuICAgICAgICAgICAgY29uc3QgbWF4U3RlZXJWYWx1ZSA9IE1hdGguUEkgLyA4O1xuXG4gICAgICAgICAgICB2ZWhpY2xlLnNldFdoZWVsRm9yY2UoZm9yd2FyZCAqIG1heEZvcmNlLCAyKTtcbiAgICAgICAgICAgIHZlaGljbGUuc2V0V2hlZWxGb3JjZShmb3J3YXJkICogbWF4Rm9yY2UsIDMpO1xuICAgICAgICAgICAgdmVoaWNsZS5zZXRTdGVlcmluZ1ZhbHVlKHR1cm4gKiBtYXhTdGVlclZhbHVlLCAwKTtcbiAgICAgICAgICAgIHZlaGljbGUuc2V0U3RlZXJpbmdWYWx1ZSh0dXJuICogbWF4U3RlZXJWYWx1ZSwgMSk7XG5cbiAgICAgICAgICAgIGlmIChmb3J3YXJkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVoaWNsZS5zZXRXaGVlbEZvcmNlKDAsIDIpO1xuICAgICAgICAgICAgICAgIHZlaGljbGUuc2V0V2hlZWxGb3JjZSgwLCAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0dXJuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVoaWNsZS5zZXRTdGVlcmluZ1ZhbHVlKDAsIDApO1xuICAgICAgICAgICAgICAgIHZlaGljbGUuc2V0U3RlZXJpbmdWYWx1ZSgwLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyDjgq3jg7zjgqTjg5njg7Pjg4jjgavjgojjgovou4rjga7mk43kvZxcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yd2FyZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGZvcndhcmQgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgdHVybiA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0dXJuID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0Rm9yY2VBbmRTdGVlcmluZygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBmb3J3YXJkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdHVybiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0Rm9yY2VBbmRTdGVlcmluZygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDlhYnmupDjga7oqK3lrppcbiAgICAgICAgdGhpcy5saWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmLCAxLCAyNSk7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmNvcHkobmV3IFRIUkVFLlZlY3RvcjMoMCwgMiwgMSkubm9ybWFsaXplKCkpO1xuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5saWdodCk7XG5cblxuXG4gICAgICAgIC8vIOODr+OCtOODs+i7iuOBruiNt+eJqeeUqOOBrueri+aWueS9k1xuICAgICAgICBjb25zdCBjYXJnb1dpZHRoID0gNjsgIC8vIOWFg+OBrui7iuOBruW5heOBq+WQiOOCj+OBm+OCi1xuICAgICAgICBjb25zdCBjYXJnb0hlaWdodCA9IDI7IC8vIOmBqeW9k+OBqumrmOOBlVxuICAgICAgICBjb25zdCBjYXJnb0RlcHRoID0gNDsgIC8vIOWFg+OBrui7iuOBruWlpeihjOOBjeOBq+WQiOOCj+OBm+OCi1xuXG4gICAgICAgIGNvbnN0IGNhcmdvTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYgfSk7IC8vIOS+i+OBiOOBsOeZveiJslxuXG4gICAgICAgIGNvbnN0IGNhcmdvR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoY2FyZ29XaWR0aCwgY2FyZ29IZWlnaHQsIGNhcmdvRGVwdGgpO1xuICAgICAgICBjb25zdCBjYXJnb01lc2ggPSBuZXcgVEhSRUUuTWVzaChjYXJnb0dlb21ldHJ5LCBjYXJnb01hdGVyaWFsKTtcbiAgICAgICAgY2FyZ29NZXNoLnBvc2l0aW9uLnNldCgxLCAxLjUsIC00KTsgLy8g6LuK44Gu5b6M6YOo44Gr6YWN572uXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGNhcmdvTWVzaCk7XG5cbiAgICAgICAgLy8g44Ki44OD44OX44OH44O844OI44Or44O844OXXG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMud29ybGQuZml4ZWRTdGVwKCk7ICAgLy8g54mp55CG44K344Of44Ol44Os44O844K344On44Oz44Gu5Zu65a6a44K544OG44OD44OXXG5cbiAgICAgICAgICAgIC8vIOi7iuS4oeOBruS9jee9ruOBqOWbnui7ouOCkuODoeODg+OCt+ODpeOBq+mBqeeUqFxuICAgICAgICAgICAgYm94TWVzaC5wb3NpdGlvbi5zZXQodGhpcy5jYXJCb2R5LnBvc2l0aW9uLngsIHRoaXMuY2FyQm9keS5wb3NpdGlvbi55LCB0aGlzLmNhckJvZHkucG9zaXRpb24ueik7XG4gICAgICAgICAgICBib3hNZXNoLnF1YXRlcm5pb24uc2V0KHRoaXMuY2FyQm9keS5xdWF0ZXJuaW9uLngsIHRoaXMuY2FyQm9keS5xdWF0ZXJuaW9uLnksIHRoaXMuY2FyQm9keS5xdWF0ZXJuaW9uLnosIHRoaXMuY2FyQm9keS5xdWF0ZXJuaW9uLncpO1xuICAgICAgICAgICAgZnJvbnRMZWZ0TWVzaC5wb3NpdGlvbi5zZXQoZnJvbnRMZWZ0V2hlZWxCb2R5LnBvc2l0aW9uLngsIGZyb250TGVmdFdoZWVsQm9keS5wb3NpdGlvbi55LCBmcm9udExlZnRXaGVlbEJvZHkucG9zaXRpb24ueik7XG4gICAgICAgICAgICBmcm9udExlZnRNZXNoLnF1YXRlcm5pb24uc2V0KGZyb250TGVmdFdoZWVsQm9keS5xdWF0ZXJuaW9uLngsIGZyb250TGVmdFdoZWVsQm9keS5xdWF0ZXJuaW9uLnksIGZyb250TGVmdFdoZWVsQm9keS5xdWF0ZXJuaW9uLnosIGZyb250TGVmdFdoZWVsQm9keS5xdWF0ZXJuaW9uLncpO1xuICAgICAgICAgICAgZnJvbnRSaWdodE1lc2gucG9zaXRpb24uc2V0KGZyb250UmlnaHRXaGVlbEJvZHkucG9zaXRpb24ueCwgZnJvbnRSaWdodFdoZWVsQm9keS5wb3NpdGlvbi55LCBmcm9udFJpZ2h0V2hlZWxCb2R5LnBvc2l0aW9uLnopO1xuICAgICAgICAgICAgZnJvbnRSaWdodE1lc2gucXVhdGVybmlvbi5zZXQoZnJvbnRSaWdodFdoZWVsQm9keS5xdWF0ZXJuaW9uLngsIGZyb250UmlnaHRXaGVlbEJvZHkucXVhdGVybmlvbi55LCBmcm9udFJpZ2h0V2hlZWxCb2R5LnF1YXRlcm5pb24ueiwgZnJvbnRSaWdodFdoZWVsQm9keS5xdWF0ZXJuaW9uLncpO1xuICAgICAgICAgICAgYmFja0xlZnRNZXNoLnBvc2l0aW9uLnNldChiYWNrTGVmdFdoZWVsQm9keS5wb3NpdGlvbi54LCBiYWNrTGVmdFdoZWVsQm9keS5wb3NpdGlvbi55LCBiYWNrTGVmdFdoZWVsQm9keS5wb3NpdGlvbi56KTtcbiAgICAgICAgICAgIGJhY2tMZWZ0TWVzaC5xdWF0ZXJuaW9uLnNldChiYWNrTGVmdFdoZWVsQm9keS5xdWF0ZXJuaW9uLngsIGJhY2tMZWZ0V2hlZWxCb2R5LnF1YXRlcm5pb24ueSwgYmFja0xlZnRXaGVlbEJvZHkucXVhdGVybmlvbi56LCBiYWNrTGVmdFdoZWVsQm9keS5xdWF0ZXJuaW9uLncpO1xuICAgICAgICAgICAgYmFja1JpZ2h0TWVzaC5wb3NpdGlvbi5zZXQoYmFja1JpZ2h0V2hlZWxCb2R5LnBvc2l0aW9uLngsIGJhY2tSaWdodFdoZWVsQm9keS5wb3NpdGlvbi55LCBiYWNrUmlnaHRXaGVlbEJvZHkucG9zaXRpb24ueik7XG4gICAgICAgICAgICBiYWNrUmlnaHRNZXNoLnF1YXRlcm5pb24uc2V0KGJhY2tSaWdodFdoZWVsQm9keS5xdWF0ZXJuaW9uLngsIGJhY2tSaWdodFdoZWVsQm9keS5xdWF0ZXJuaW9uLnksIGJhY2tSaWdodFdoZWVsQm9keS5xdWF0ZXJuaW9uLnosIGJhY2tSaWdodFdoZWVsQm9keS5xdWF0ZXJuaW9uLncpO1xuXG4gICAgICAgICAgICAvLyDojbfnianjga7kvY3nva7jgajlm57ou6LjgpLou4rkuKHjgavlkIjjgo/jgZvjgotcbiAgICAgICAgICAgIGNhcmdvTWVzaC5wb3NpdGlvbi5zZXQodGhpcy5jYXJCb2R5LnBvc2l0aW9uLnggKyAxLCB0aGlzLmNhckJvZHkucG9zaXRpb24ueSArIDEuNSwgdGhpcy5jYXJCb2R5LnBvc2l0aW9uLnopO1xuICAgICAgICAgICAgY2FyZ29NZXNoLnF1YXRlcm5pb24uc2V0KHRoaXMuY2FyQm9keS5xdWF0ZXJuaW9uLngsIHRoaXMuY2FyQm9keS5xdWF0ZXJuaW9uLnksIHRoaXMuY2FyQm9keS5xdWF0ZXJuaW9uLnosIHRoaXMuY2FyQm9keS5xdWF0ZXJuaW9uLncpO1xuXG4gICAgICAgICAgICAvLyDjgrPjgqTjg7Pjga7li5XjgY3jgajooZ3nqoHliKTlrppcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29pbiBvZiB0aGlzLmNvaW5zKSB7XG4gICAgICAgICAgICAgICAgY29pbi5ib2R5LnBvc2l0aW9uLnggKz0gY29pbi5kaXJlY3Rpb24ueCAqIGNvaW4uc3BlZWQ7XG4gICAgICAgICAgICAgICAgY29pbi5ib2R5LnBvc2l0aW9uLnogKz0gY29pbi5kaXJlY3Rpb24ueiAqIGNvaW4uc3BlZWQ7XG4gICAgICAgICAgICAgICAgY29pbi5tZXNoLnBvc2l0aW9uLnNldChjb2luLmJvZHkucG9zaXRpb24ueCwgY29pbi5ib2R5LnBvc2l0aW9uLnksIGNvaW4uYm9keS5wb3NpdGlvbi56KTtcblxuICAgICAgICAgICAgICAgIGlmIChjb2luLmJvZHkucG9zaXRpb24ueCA8IC0yMCB8fCBjb2luLmJvZHkucG9zaXRpb24ueCA+IDIwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW4uZGlyZWN0aW9uLnggKj0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb2luLmJvZHkucG9zaXRpb24ueiA8IC0yMCB8fCBjb2luLmJvZHkucG9zaXRpb24ueiA+IDIwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW4uZGlyZWN0aW9uLnogKj0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDjgrPjgqTjg7Pjgajou4rjga7ooZ3nqoHliKTlrppcbiAgICAgICAgICAgIGlmICh0aGlzLmNvaW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2luID0gdGhpcy5jb2luc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuY2FyQm9keS5wb3NpdGlvbi5kaXN0YW5jZVRvKGNvaW4uYm9keS5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZShjb2luLm1lc2gpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnJlbW92ZUJvZHkoY29pbi5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2lucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDbGVhck1lc3NhZ2UoKTsgICAvLyDjgIxDbGVhcu+8geOAjeODoeODg+OCu+ODvOOCuOOCkuihqOekulxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7ICAvLyDmrKHjga7jg5Xjg6zjg7zjg6DjgpLjg6rjgq/jgqjjgrnjg4hcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICB9XG5cblxuICAgIC8vIOOCs+OCpOODs+OCkuS9nOaIkOOBmeOCi+ODoeOCveODg+ODiVxuICAgIHByaXZhdGUgY3JlYXRlQ29pbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29pbkdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDEpO1xuICAgICAgICBjb25zdCBjb2luTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmMDAgfSk7ICAvLyDpu4ToibLjgavoqK3lrppcblxuICAgICAgICBjb25zdCBjb2luTWVzaCA9IG5ldyBUSFJFRS5NZXNoKGNvaW5HZW9tZXRyeSwgY29pbk1hdGVyaWFsKTtcbiAgICAgICAgY29uc3QgeCA9IE1hdGgucmFuZG9tKCkgKiA0MCAtIDIwO1xuICAgICAgICBjb25zdCB6ID0gTWF0aC5yYW5kb20oKSAqIDQwIC0gMjA7XG4gICAgICAgIGNvaW5NZXNoLnBvc2l0aW9uLnNldCh4LCAwLjUsIHopO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChjb2luTWVzaCk7XG5cbiAgICAgICAgY29uc3QgY29pblNoYXBlID0gbmV3IENBTk5PTi5TcGhlcmUoMC41KTtcbiAgICAgICAgY29uc3QgY29pbkJvZHkgPSBuZXcgQ0FOTk9OLkJvZHkoeyBtYXNzOiAwLjEgfSk7XG4gICAgICAgIGNvaW5Cb2R5LmFkZFNoYXBlKGNvaW5TaGFwZSk7XG4gICAgICAgIGNvaW5Cb2R5LnBvc2l0aW9uLnNldCh4LCAwLjUsIHopO1xuICAgICAgICB0aGlzLndvcmxkLmFkZEJvZHkoY29pbkJvZHkpO1xuXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKE1hdGgucmFuZG9tKCkgLSAwLjUsIDAsIE1hdGgucmFuZG9tKCkgLSAwLjUpLm5vcm1hbGl6ZSgpO1xuICAgICAgICBjb25zdCBzcGVlZCA9IDAuMDI7XG5cbiAgICAgICAgdGhpcy5jb2lucy5wdXNoKHsgbWVzaDogY29pbk1lc2gsIGJvZHk6IGNvaW5Cb2R5LCBkaXJlY3Rpb246IGRpcmVjdGlvbiwgc3BlZWQ6IHNwZWVkIH0pO1xuXG4gICAgICAgIC8vIOOCs+OCpOODs+OBqOi7iuOBruihneeqgeOCpOODmeODs+ODiFxuICAgICAgICB0aGlzLndvcmxkLmFkZEV2ZW50TGlzdGVuZXIoJ2JlZ2luQ29udGFjdCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYm9keUEgPSBldmVudC5ib2R5QTtcbiAgICAgICAgICAgIGNvbnN0IGJvZHlCID0gZXZlbnQuYm9keUI7XG5cbiAgICAgICAgICAgIGlmICgoYm9keUEgPT09IGNvaW5Cb2R5ICYmIGJvZHlCID09PSB0aGlzLmNhckJvZHkpIHx8IChib2R5QiA9PT0gY29pbkJvZHkgJiYgYm9keUEgPT09IHRoaXMuY2FyQm9keSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZShjb2luTWVzaCk7XG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5yZW1vdmVCb2R5KGNvaW5Cb2R5KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW5zID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q2xlYXJNZXNzYWdlKCk7ICAvLyDjgIxDbGVhcu+8geOAjeODoeODg+OCu+ODvOOCuOOCkuihqOekulxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyDjg6Hjg4Pjgrvjg7zjgrjnlKjjga7jg4bjgq3jgrnjg4jjgrnjg5fjg6njgqTjg4jjgpLkvZzmiJDjgZnjgovjg6Hjgr3jg4Pjg4lcbiAgICBwcml2YXRlIGNyZWF0ZVRleHRTcHJpdGUgPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmICghY29udGV4dCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIOOCreODo+ODs+ODkOOCueOCteOCpOOCuuOBruioreWumlxuICAgICAgICBjb25zdCBjYW52YXNXaWR0aCA9IDMwMDsgIC8vIOW5heOCkumBqeWIh+OBquOCteOCpOOCuuOBq+ioreWumlxuICAgICAgICBjb25zdCBjYW52YXNIZWlnaHQgPSAxNTA7IC8vIOmrmOOBleOCkumBqeWIh+OBquOCteOCpOOCuuOBq+ioreWumlxuICAgICAgICBjYW52YXMud2lkdGggPSBjYW52YXNXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGNhbnZhc0hlaWdodDtcblxuICAgICAgICAvLyDjg5Xjgqnjg7Pjg4jjgrXjgqTjgrrjgajjgrnjgr/jgqTjg6vjga7oqK3lrppcbiAgICAgICAgY29udGV4dC5mb250ID0gJzYwcHggQXJpYWwnOyAvLyDjg5Xjgqnjg7Pjg4jjgrXjgqTjgrrjgpLlpKfjgY3jgY/oqK3lrppcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnOyAvLyDjg4bjgq3jgrnjg4jjga7lnoLnm7TmlrnlkJHjga7kuK3lpK7mj4PjgYhcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChtZXNzYWdlLCBjYW52YXNXaWR0aCAvIDIsIGNhbnZhc0hlaWdodCAvIDIpO1xuXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICAgICAgICBjb25zdCBzcHJpdGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSB9KTtcbiAgICAgICAgY29uc3Qgc3ByaXRlID0gbmV3IFRIUkVFLlNwcml0ZShzcHJpdGVNYXRlcmlhbCk7XG5cbiAgICAgICAgLy8g44K544OX44Op44Kk44OI44Gu44K544Kx44O844Or44KS44Kt44Oj44Oz44OQ44K544K144Kk44K644Gr5ZCI44KP44Gb44Gm6Kq/5pW0XG4gICAgICAgIHNwcml0ZS5zY2FsZS5zZXQoY2FudmFzV2lkdGggLyAxMCwgY2FudmFzSGVpZ2h0IC8gMTAsIDEpO1xuICAgICAgICBzcHJpdGUucG9zaXRpb24uc2V0KDAsIDUsIDApO1xuXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHNwcml0ZSk7XG4gICAgICAgIHRoaXMuY2xlYXJTcHJpdGUgPSBzcHJpdGU7XG4gICAgfVxuXG4gICAgLy8g44CMQ2xlYXLvvIHjgI3jg6Hjg4Pjgrvjg7zjgrjjgpLooajnpLrjgZnjgovjg6Hjgr3jg4Pjg4lcbiAgICBwcml2YXRlIHNob3dDbGVhck1lc3NhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNsZWFyU3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZSh0aGlzLmNsZWFyU3ByaXRlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNyZWF0ZVRleHRTcHJpdGUoXCJDbGVhciFcIik7XG4gICAgfVxufVxuLy8gRE9NQ29udGVudExvYWRlZCDjgqTjg5njg7Pjg4jjgafliJ3mnJ/ljJbplqLmlbDjgpLlkbzjgbPlh7rjgZlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTsgIC8vIFRocmVlSlNDb250YWluZXLjga7jgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvZzmiJBcbiAgICBsZXQgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDI1LCAyNSwgMjUpKTsgICAvLyDjg6zjg7Pjg4Djg6njg7zjgajjgqvjg6Hjg6njga7kvZzmiJBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTsgICAgIC8vIOODrOODs+ODgOODqeODvOOCkkRPTeOBq+i/veWKoFxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19jYW5ub24tZXNfZGlzdF9jYW5ub24tZXNfanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmItZTU4YmQyXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9