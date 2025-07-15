/**
 * Scatters items around the container, making sure they don't overlap.
 * The items are found in the child with spaw-object-container class.
 * @param {HTMLElement} container 
 */
function generateBackdrop(container){
    // TODO: num_retries should be calculated based on the area of 
    // the container and the size of items, instead of being given directly.
    // TODO: Another potential improvement would be trying to fit smaller items 
    // when larger ones fail to generate
    // TODO: As well as all that it would be nice to rerun this on window 
    // resize, as backdrop dissapears when rescaled 
    const num_retries = 300;

    const spawnable_container = container.getElementsByClassName("spawn-objects-container")[0];
    const spawnable_items = spawnable_container.children;
    // get bounding radiuses of these objects
    const prefab_rects = [];

    spawnable_container.style.display = "block";
    for(let prefab of spawnable_items){
        const rect = prefab.getBoundingClientRect();;
        prefab_rects.push(rect);
    }
    spawnable_container.style.display = "";
    
    const container_rect = container.getBoundingClientRect();
    const instances = [];
    while(true){
        // spawn item
        const index = Math.floor(spawnable_items.length * Math.random())
        const prefab = spawnable_items[index];
        const rect = prefab_rects[index];
        const radius = Math.max(rect.width, rect.height);

        const instance = prefab.cloneNode();

        let el_x, el_y;
        let valid = false;
        for(let retries = 0; retries < num_retries; retries++){
            // pick a point
            el_x = Math.random() * container_rect.width;
            el_y = Math.random() * container_rect.height;

            // check if it's valid
            valid = true;
            for(let instance of instances){
                const dx = el_x - instance.x;
                const dy = el_y - instance.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                
                if(distance < (radius + instance.r)){
                    valid = false;
                    break;
                }
            }

            if(valid){
                break;
            }
        }

        if(!valid){
            return;
        }

        // adding instance
        instances.push({"x": el_x, "y": el_y, "r":radius});

        instance.style.left = (el_x - rect.width/2) + "px";
        instance.style.top = (el_y - rect.height/2) + "px";
        instance.style.rotate = Math.random() * 360 + "deg";

        container.appendChild(instance);
    }
}

window.addEventListener("load", () => {
    const backdrops = document.getElementsByClassName("backdrop");
    
    for(let backdrop of backdrops){
        generateBackdrop(backdrop);
    }
})