function XRattr(name, value) {
//    console.log(`${name}: ${value}`);
    switch(name) {

        //$XR.Scene.children[0].material.color = { r: 1, g: 0, b: 1, isColor: 1 };
        case 'color':
            const color = new THREE.Color(value);
            return `material.color = \{ isColor: ${color.isColor}, r: ${color.r}, g: ${color.g}, b: ${color.b} \}`;
            break;


        case 'id':
            return `name = ${value}`;
            break;


        case 'position':
//            value = value.replace(' ', '');
//            value = value.split(',');
            return `position.set(${value})`;
//            return `position.set \{ ${value[0]}, ${value[1]}, ${value[2]} \}`;
            break;


        case 'rotation':
            return `rotation.set(${value})`;

        default: return name + " = " + value; break;

    }
}
