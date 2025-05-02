class FallingItemsAnimator{
    /** @type {HTMLElement} */
    container = null;

    item_density = 2; // in amount per 100x100px
    item_fall_speed = 100; // in px per second

    num_scatter_items = 15;
    spawning_interval = null;

    playback_target = 0;
    playback_current = 0;
    playback_transition_speed = 0.07;

    animation_durations = new Map();

    getSpawnItems(){
        const spawn_container = this.container.getElementsByClassName("spawn-objects-container")[0];
        return spawn_container.children;
    }

    getInstances(){
        const items = this.container.children;
        return Array.from(items).filter((item) => !item.classList.contains("spawn-objects-container"));
    }

    constructor(container){
        this.container = container;
    }

    destroyItem(instance){
        this.animation_durations.delete(instance);
        instance.remove();
    }

    spawnItem(){
        const objects = this.getSpawnItems();
        const prefab = objects[Math.floor(Math.random() * objects.length)]
        
        const instance = prefab.cloneNode();
        
        this.container.appendChild(instance);
        this.setupAnimations(instance);
        this.setPlaybackRateForItem(instance, this.playback_current);

        return instance;
    }

    updatePlaybackTarget(playback_target){
        this.playback_target = playback_target;

        const playbackUpdater = () => {
            const error = this.playback_target - this.playback_current;
            if(Math.abs(error) < 0.01){
                this.playback_current = this.playback_target;
            }else{
                this.playback_current += error * this.playback_transition_speed;
                requestAnimationFrame(playbackUpdater);
            }

            // update animations
            this.getInstances().forEach((item) => {
                this.setPlaybackRateForItem(item, this.playback_current);
            })
        }

        requestAnimationFrame(playbackUpdater);
    }

    setPlaybackRateForItem(item, playback_rate){
        item.getAnimations().forEach((animation) => {
            animation.updatePlaybackRate(playback_rate)

            if(playback_rate == 0){
                animation.pause();
            }else{
                animation.play();
            }
        });
    }

    play(){
        if(this.spawning_interval != null){
            return;
        }

        const container_width = this.container.getBoundingClientRect().width;
        const item_density_norm = this.item_density / (100 * 100)
        const spawn_rate = 1000 / (item_density_norm * this.item_fall_speed * container_width);

        this.spawning_interval = setInterval(() => this.spawnItem(), spawn_rate);

        this.updatePlaybackTarget(1);
    }

    scatter(){
        const bounding_rect = this.container.getBoundingClientRect();
        const item_density_norm = this.item_density / (100 * 100);
        const num_items_to_spawn = Math.floor(bounding_rect.height * bounding_rect.width * item_density_norm);
        for(let i = 0; i < num_items_to_spawn; i++){
            const item = this.spawnItem();
            const animation_duration = this.animation_durations.get(item);

            const falling_animation = item.getAnimations()[0];
            falling_animation.currentTime = animation_duration * Math.random();
        }
    }

    clear(){
        this.getInstances().forEach((item) => this.destroyItem(item))
    }

    freeze(){
        clearInterval(this.spawning_interval);
        this.spawning_interval = null;
        this.updatePlaybackTarget(0);
    }


    /**
     * 
     * @param {HTMLElement} instance 
     */
    setupAnimations(instance){
        // set random x-position
        instance.style.left = Math.random() * 100 + "%";
        
        // set random rotation and scale
        const depth = Math.random();
        const scale = 1 / (depth + 1);
        const rotation = Math.random() * 360;

        instance.style.transform = `rotate(${rotation}deg) scale(${scale})`

        const container_height = this.container.getBoundingClientRect().height;

        // add moving down animation
        const speed = this.item_fall_speed / (depth + 1)
        const animation_time = container_height * 1000 / speed;
     

        const bounding_rect = instance.getBoundingClientRect();
        // as instance might rotate, we will operate on biggest possible height: diagonal
        const instance_max_height = Math.sqrt(Math.pow(bounding_rect.height, 2) + Math.pow(bounding_rect.width, 2));

        const safety_buffer = 50;

        const start_y_px = - instance_max_height - safety_buffer;
        const end_y_px = container_height + instance_max_height + safety_buffer;
        const start_y_percent = start_y_px / container_height * 100;
        const end_y_percent = end_y_px / container_height * 100;

        const keyframes = [
            { top: `${start_y_percent}%` },
            { top: `${end_y_percent}%` },
        ];

        // FIXME: there is a bug when if the animation is paused at the same frame it's finished, 
        // destruction callback is not called, and the animation gets deleted for some reason.
        // this makes it so the object returns back to it's non-animated spot. With slow pause, this
        // issue is really rare, but with abrupt pausing it's pretty noticable.
        // for now I just modified non-animated position, so these non-animated items don't appear in the
        // container.
        instance.style.top = `${end_y_percent}%`;

        const animation = instance.animate(keyframes, {duration: animation_time});
        animation.addEventListener("finish", (e) => this.destroyItem(instance));

        // record animation duration
        this.animation_durations.set(instance, animation_time);
    }

}