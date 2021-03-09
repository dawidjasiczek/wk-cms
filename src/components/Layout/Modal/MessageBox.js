import Vue from 'vue';
import vueTemplate from './MessageBoxTemplate';

const ElementConstructor = Vue.extend(vueTemplate);

let instance, resolve, reject = null;
let waitForCleanup = true;

function cleanInstance(waitForCleanup){
    return new Promise((localResolve, localReject) => {
        instance.show = false;
        if(waitForCleanup === false) localResolve();
        setTimeout(_ => {
            if(instance.$el){
                const bodyChilds = document.body.childNodes;
                for(let i = bodyChilds.length - 1; i >= 0; i--){
                    if(bodyChilds[i].isSameNode(instance.$el)){
                        document.body.removeChild(instance.$el);
                    }
                }
            }
            instance.$destroy();
            instance = null;
            if(waitForCleanup !== false){
                return localResolve();
            }
        }, 200);
    });
    
}

const MessageBox = (options) => {

    if (Vue.prototype.$isServer) return;

    if(!options) options = {};

    if(!instance){
        instance = new ElementConstructor({
            el: document.createElement('div')
        });
    }

    if(options.confirmButtonText && typeof options.confirmButtonText == 'string'){
        instance.confirmButtonText = options.confirmButtonText;
    }
    if(options.cancelButtonText && typeof options.cancelButtonText == 'string'){
        instance.cancelButtonText = options.cancelButtonText;
    }
    if(options.confirmButtonType && typeof options.confirmButtonType == 'string'){
        instance.confirmButtonType = options.confirmButtonType;
    }
    if(options.text && typeof options.text == 'string'){
        instance.text = options.text;
    }
    if(options.inputLabel && typeof options.inputLabel == 'string'){
        instance.inputLabel = options.inputLabel;
    }
    if(options.inputMsg && typeof options.inputMsg == 'string'){
        instance.inputMsg = options.inputMsg;
    }
    if(options.showInput === true){
        instance.showInput = true;
    }
    if(options.waitForCleanup === false){
        waitForCleanup = false;
    }


    instance.$on('confirm', async _ => {
        await cleanInstance(waitForCleanup);
        return resolve(_);
    });
    instance.$on('cancel', async _ => {
        await cleanInstance(waitForCleanup);
        return reject(_);
    });

    
    document.body.appendChild(instance.$el);
    
    Vue.nextTick(_ => {
        instance.show = true;
    });

    return new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
}

export default {
    install(Vue, options){
        Vue.prototype.$messageBox = MessageBox;
    }
};