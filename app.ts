// 22FI023
// 大竹里佳
// 最終課題

import * as THREE from "three";
import * as CANNON from 'cannon-es';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeJSContainer {
    private scene: THREE.Scene;    // Three,jsのシーン
    private light: THREE.Light;    // シーン内の光源
    private world: CANNON.World;   // CANNON.jsの物理世界
    private coins: { mesh: THREE.Mesh, body: CANNON.Body, direction: THREE.Vector3, speed: number }[] = [];  // コインの配列
    private carBody: CANNON.Body;  // 車の物理ボディ
    private clearSprite: THREE.Sprite | null = null; // 「Clear！」メッセージのスプライト

    constructor() {
        // 空のコンストラクタ
    }

    // レンダラーとカメラを作成し、COMに追加するメソッド
    public createRendererDOM = (width: number, height: number, cameraPos: THREE.Vector3) => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new THREE.Color(0x495ed));  // 背景色
        renderer.shadowMap.enabled = true;                 // シャドウマッピングを有効にする

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);                   // カメラ位置の設定
        camera.lookAt(new THREE.Vector3(0, 0, 0));         // カメラの向きを設定

        const orbitControls = new OrbitControls(camera, renderer.domElement);  // カメラ操作用のコントロールを追加

        this.createScene();    // シーンの作成

        // レンダリングループ
        const render: FrameRequestCallback = (time) => {
            orbitControls.update();   // カメラコントロールの更新
            renderer.render(this.scene, camera);    // シーンの描画
            requestAnimationFrame(render);          // 次のフレームをリクエスト
        }
        requestAnimationFrame(render);

        // レンダラーのスタイル設定
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    }

    // シーンの作成
    private createScene = () => {
        this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });

        this.scene = new THREE.Scene();

        // ディフォルトの接触材質の設定
        this.world.defaultContactMaterial.restitution = 0.9;
        this.world.defaultContactMaterial.friction = 0.03;

        // 車の物理ボディの作成
        this.carBody = new CANNON.Body({ mass: 5 });

        const carBodyShape = new CANNON.Box(new CANNON.Vec3(4, 0.5, 2));
        this.carBody.addShape(carBodyShape);
        this.carBody.position.y = 1;

        const vehicle = new CANNON.RigidVehicle({ chassisBody: this.carBody });

        // 車のタイヤの物理ボディの作成
        const wheelShape = new CANNON.Sphere(1);
        const frontLeftWheelBody = new CANNON.Body({ mass: 1 });
        frontLeftWheelBody.addShape(wheelShape);
        frontLeftWheelBody.angularDamping = 0.4;
        const frontRightWheelBody = new CANNON.Body({ mass: 1 });
        frontRightWheelBody.addShape(wheelShape);
        frontRightWheelBody.angularDamping = 0.4;
        const backLeftWheelBody = new CANNON.Body({ mass: 1 });
        backLeftWheelBody.addShape(wheelShape);
        backLeftWheelBody.angularDamping = 0.4;
        const backRightWheelBody = new CANNON.Body({ mass: 1 });
        backRightWheelBody.addShape(wheelShape);
        backRightWheelBody.angularDamping = 0.4;

        // 車にタイヤを追加
        // 左前
        vehicle.addWheel({
            body: frontLeftWheelBody,
            position: new CANNON.Vec3(-2, 0, 2.5)
        });
        // 右前
        vehicle.addWheel({
            body: frontRightWheelBody,
            position: new CANNON.Vec3(-2, 0, -2.5)
        });
        // 左後ろ
        vehicle.addWheel({
            body: backLeftWheelBody,
            position: new CANNON.Vec3(2, 0, 2.5)
        });
        // 右後ろ
        vehicle.addWheel({
            body: backRightWheelBody,
            position: new CANNON.Vec3(2, 0, -2.5)
        });

        vehicle.addToWorld(this.world);  // 車を物理世界に追加

        // 車のメッシュとタイヤのメッシュを作成してシーンに追加
        const boxGeometry = new THREE.BoxGeometry(8, 1, 4);
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // 例えば白色
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        this.scene.add(boxMesh);

        const wheelGeometry = new THREE.SphereGeometry(1);
        // グレーに設定
        const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

        const frontLeftMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        this.scene.add(frontLeftMesh);

        const frontRightMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        this.scene.add(frontRightMesh);

        const backLeftMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        this.scene.add(backLeftMesh);

        const backRightMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        this.scene.add(backRightMesh);

        // 平面を作成してシーンに追加
        const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });

        const planeWidth = 100;
        const planeHeight = 100;
        const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
        const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial);
        planeMesh.material.side = THREE.DoubleSide;
        planeMesh.rotateX(-Math.PI / 2);
        this.scene.add(planeMesh);

        const planeShape = new CANNON.Plane();
        const planeBody = new CANNON.Body({ mass: 0 });
        planeBody.addShape(planeShape);
        planeBody.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z);
        planeBody.quaternion.set(planeMesh.quaternion.x, planeMesh.quaternion.y, planeMesh.quaternion.z, planeMesh.quaternion.w);
        this.world.addBody(planeBody);

        this.createCoin();  // コインの作成

        let forward = 0;    // 車の前進・後退の力
        let turn = 0;       // 車の旋回の角度

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
        this.light = new THREE.PointLight(0xffffff, 1, 25);
        const lvec = new THREE.Vector3().copy(new THREE.Vector3(0, 2, 1).normalize());
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);



        // ワゴン車の荷物用の立方体
        const cargoWidth = 6;  // 元の車の幅に合わせる
        const cargoHeight = 2; // 適当な高さ
        const cargoDepth = 4;  // 元の車の奥行きに合わせる

        const cargoMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // 例えば白色

        const cargoGeometry = new THREE.BoxGeometry(cargoWidth, cargoHeight, cargoDepth);
        const cargoMesh = new THREE.Mesh(cargoGeometry, cargoMaterial);
        cargoMesh.position.set(1, 1.5, -4); // 車の後部に配置
        this.scene.add(cargoMesh);

        // アップデートループ
        let update: FrameRequestCallback = (time) => {
            this.world.fixedStep();   // 物理シミュレーションの固定ステップ

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
                    this.showClearMessage();   // 「Clear！」メッセージを表示
                }
            }

            requestAnimationFrame(update);  // 次のフレームをリクエスト
        }
        requestAnimationFrame(update);
    }


    // コインを作成するメソッド
    private createCoin = () => {
        const coinGeometry = new THREE.SphereGeometry(1);
        const coinMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });  // 黄色に設定

        const coinMesh = new THREE.Mesh(coinGeometry, coinMaterial);
        const x = Math.random() * 40 - 20;
        const z = Math.random() * 40 - 20;
        coinMesh.position.set(x, 0.5, z);
        this.scene.add(coinMesh);

        const coinShape = new CANNON.Sphere(0.5);
        const coinBody = new CANNON.Body({ mass: 0.1 });
        coinBody.addShape(coinShape);
        coinBody.position.set(x, 0.5, z);
        this.world.addBody(coinBody);

        const direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
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
                this.showClearMessage();  // 「Clear！」メッセージを表示
            }
        });
    }

    // メッセージ用のテキストスプライトを作成するメソッド
    private createTextSprite = (message: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return;

        // キャンバスサイズの設定
        const canvasWidth = 300;  // 幅を適切なサイズに設定
        const canvasHeight = 150; // 高さを適切なサイズに設定
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // フォントサイズとスタイルの設定
        context.font = '60px Arial'; // フォントサイズを大きく設定
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle'; // テキストの垂直方向の中央揃え
        context.fillText(message, canvasWidth / 2, canvasHeight / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);

        // スプライトのスケールをキャンバスサイズに合わせて調整
        sprite.scale.set(canvasWidth / 10, canvasHeight / 10, 1);
        sprite.position.set(0, 5, 0);

        this.scene.add(sprite);
        this.clearSprite = sprite;
    }

    // 「Clear！」メッセージを表示するメソッド
    private showClearMessage = () => {
        if (this.clearSprite) {
            this.scene.remove(this.clearSprite);
        }
        this.createTextSprite("Clear!");
    }
}
// DOMContentLoaded イベントで初期化関数を呼び出す
window.addEventListener("DOMContentLoaded", init);

function init() {
    let container = new ThreeJSContainer();  // ThreeJSContainerのインスタンスを作成
    let viewport = container.createRendererDOM(640, 480, new THREE.Vector3(25, 25, 25));   // レンダラーとカメラの作成
    document.body.appendChild(viewport);     // レンダラーをDOMに追加
}
