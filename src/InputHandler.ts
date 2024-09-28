class InputHandler {
  keys: { [key: string]: boolean };

  constructor() {
    this.keys = {};

    window.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });
  }

  isKeyDown(key: string): boolean {
    return this.keys[key] === true;
  }
}

export default InputHandler;
