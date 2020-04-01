import {Object2D as canvas, Object2D, Vec2D} from "./math.js";
import Settings from "./Settings.js";

export default class Player extends Object2D {


    constructor(size, pos, sprite) {
        super(size, pos);
        this.force = new Vec2D(0, 0);
        this.sprite = sprite;
        this.direction = new Vec2D(1,0);
    }

    // time respresenta el tiempo que ha pasado desde la última ejecución
    update(time) {

        /*
       Asume por el momento que Settings.SCREEN_HEIGHT y Settings.SCREEN_WIDTH indican el tamaño de
       la pantalla del juego. Settings tiene otras constantes definidas (échales un vistazo)
       El objeto player tiene una altura (height) y una anchura (width)
        */

        this.position.y += 1;
        // si buster está cayendo (está por debajo de la altura de la pantalla)
        if (this.position.y > Settings.SCREEN_HEIGHT) {
            // fuerza = añadir fuerza vertical de gravedad * tiempo
            this.force.y += Settings.GRAVITY * time;
            // position = añadir fuerza * tiempo al eje y
            this.position.y += this.force.y * time;
        }

        // position = añadir dirección * tiempo * velocidad del jugador al eje x
        this.position.x += this.direction.x * time * Settings.PLAYER_SPEED;

        // si buster se sale por la izquierda de la pantalla
        if (this.position.x <= 0) {
            // position = 0,y
            this.position = new Vec2D(0, this.position.y);
        }
        // sino, si buster se sale por la derecha
        else if (this.position.x > Settings.SCREEN_WIDTH) {
            // position =  lo más a la derecha sin salirse , y
            this.position = new Vec2D(Settings.SCREEN_WIDTH , this.position.y);
        }
        // si buster se sale por la parte inferior de la pantalla
        if (this.position.y > Settings.SCREEN_HEIGHT) {
            // position = x, lo más abajo sin salirse
            this.position = new Vec2D(this.position.x, Settings.SCREEN_HEIGHT );
        }

    }

    draw(context) {
        // pintar this.sprite en el contexto (en posicion x,y)
        context.drawImage(this.sprite, this.position.x, this.position.y)
    }
}