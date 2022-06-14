import jQuery from "jquery"
import {Recording} from "@/assets/common/dataType";


(window as any).$ = jQuery;

(window as any).$.fn.getPath = function() {
    // Get path of element
    // borrowed from http://stackoverflow.com/a/2068381/1376627
    if (this.length !== 1) throw new Error("Requires one element.");
    var path,
        node = this;
    while (node.length) {
        var realNode = node[0],
            name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) {
            name += ":eq(" + siblings.index(realNode) + ")";
        }

        path = name + (path ? ">" + path : "");
        node = parent;
    }
    return path ? path.split("html>")[1]:'';
};

let getSelector = function(el:any, names?:any) {
    if (el === document || el === document.documentElement) return "document";
    if (el === document.body) return "body";

    if (typeof names === "undefined") {let names = [];}
    if (el.id) {
        // unshift 数组开头添加元素
        names.unshift('#'+el.id);
        return names.join(" > ");
    } else if (el.className) {
        let arrNode = [].slice.call(el.parentNode.getElementsByClassName(el.className));
        let classSelector = el.className.split(" ").join(".");
        if (arrNode.length == 1) {
            names.unshift(el.tagName.toLowerCase()+"."+classSelector);
        } else {
            for(let c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++) {
                names.unshift(el.tagName.toLowerCase() + ":nth-child(" + c + ")");
            }
        }
    } else {
        for (let c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++) {
            names.unshift(el.tagName.toLowerCase() + ":nth-child(" + c + ")");
        }
    }

    if (el.parentNode !== document.body) {
        getSelector(el.parentNode, names)
    }
    return names.join(" > ");
};

console.log("loaded");
export class RecordTool {
    // config
    REPLAY_SCALE = 0.631;
    SPEED = 1;

    recording:Recording=new Recording();

    $play:any;
    $record:any;
    $body:any;

    // Record each type of event
    handlers = [
        {
            eventName: "mousemove",
            handler: (e:any)=> {
                this.recording.events.push({
                    type: "mousemove",
                    x: e.pageX,
                    y: e.pageY,
                    time: Date.now()
                });
            }
        },
        {
            eventName: "click",
            // e.target 触发的元素
            handler: (e:any) => {
                this.recording.events.push({
                    type: "click",
                    target: e.target,
                    x: e.pageX,
                    y: e.pageY,
                    time: Date.now()
                });
            }
        },
        {
            eventName: "keypress",
            handler: (e:any)=> {
                this.recording.events.push({
                    type: "keypress",
                    target: e.target,
                    value: e.target.value,
                    keyCode: e.keyCode,
                    time: Date.now()
                });
            }
        },
        {
            eventName: "keyup",
            handler: (e:any)=> {
                this.recording.events.push({
                    type: "keyup",
                    target: e.target,
                    value: e.target.value,
                    keyCode: e.keyCode,
                    time: Date.now()
            });
            }
        }
    ];

    constructor() {
        // init elements
        this.$play = $("#play");
        this.$record = $("#record");
        this.$body = $("body");
        this.$play.attr("disabled", 1);
    }

    startRecording() {
        // start recording
        this.$record.text("Recording (Click again to Stop)");
        // jquery添加属性
        // 1:$("#role").attr("disabled","disabled");
        // 当属性设置为disabled时，提交表单时，select的值无法传递；
        // 2:在提交表单设置以下：
        // $("#role").removeAttr("disabled");
        this.$play.attr("disabled", 1);
        this.recording.startTime = Date.now();
        this.recording.events = [];
        this.recording.htmlCopy = $(document.documentElement).html();
        this.recording.height = $(window).height();
        this.recording.width = $(window).width();
        // listen -> this.listen
        this.handlers.map(x => this.listen(x.eventName, x.handler));
    }
    stopRecording() {
        // stop recording
        this.$record.text("Record");
        this.$play.removeAttr("disabled");
        this.handlers.map(x => this.removeListener(x.eventName, x.handler));
    }

    replay() {
        // init iframe set scale
        const $iframe = $("<iframe>");
        if(typeof this.recording.height === 'undefined' || typeof this.recording.width === 'undefined'){
            console.log('$(window).height() or $(window).width() is undefined')
        }else {
            $iframe.height(this.recording.height * this.REPLAY_SCALE);
            $iframe.width(this.recording.width * this.REPLAY_SCALE);
        }

        $iframe.css({
            "-ms-zoom": `${this.REPLAY_SCALE}`,
            "-moz-transform": `scale(${this.REPLAY_SCALE})`,
            "-moz-transform-origin": `0 0`,
            "-o-transform": `scale(${this.REPLAY_SCALE})`,
            "-o-transform-origin": `0 0`,
            "-webkit-transform": `scale(${this.REPLAY_SCALE})`,
            "-webkit-transform-origin": `0 0`
        });
        this.$body.append($iframe);
        console.log(this.recording.events);
        // Load HTML
        // @ts-ignore
        ($iframe[0] as HTMLIFrameElement)!.contentDocument.documentElement.innerHTML = this.recording.htmlCopy;
        // @ts-ignore
        const $iframeDoc = $($iframe[0].contentDocument.documentElement);

        // Insert fake cursor
        const $fakeCursor = $('<div class="cursor"></div>');
        $iframeDoc.find("body").append($fakeCursor);

        let i = 0;
        const startPlay = Date.now();

        // 立即执行
        this.draw($iframe,i,startPlay,$fakeCursor,$iframeDoc);

    }

    draw = ($iframe:any,i:number,startPlay:number, $fakeCursor:any,$iframeDoc:any)=> {
        let event = this.recording.events[i];
        if (!event) {
            return;
        }
        let offsetRecording = event.time - this.recording.startTime;
        let offsetPlay = (Date.now() - startPlay) * this.SPEED;
        if (offsetPlay >= offsetRecording) {
            this.drawEvent(event, $fakeCursor, $iframeDoc);
            i++;
        }

        if (i < this.recording.events.length) {
            // @ts-ignore
            requestAnimationFrame(this.draw($iframe,i,startPlay,$fakeCursor,$iframeDoc));
        } else {
            $iframe.remove();
        }
    }


    drawEvent(event:any, $fakeCursor:any, $iframeDoc:any) {
        if (event.type === "click" || event.type === "mousemove") {
            $fakeCursor.css({
                top: event.y,
                left: event.x
            });
        }

        if (event.type === "click") {
            this.flashClass($fakeCursor, "click");
            // @ts-ignore
            const path = $(event.target).getPath();
            const $element = $iframeDoc.find(path);
            this.flashClass($element, "clicked");
        }

        if (event.type === "keypress"|| event.type === "keyup") {
            // const path = $(event.target).getPath();
            const path = getSelector(event.target);
            const $element = $iframeDoc.find(path);
            $element.trigger({ type: event.type, keyCode: event.keyCode });
            $element.val(event.value);
        }
    }

    // Helpers

    listen(eventName:string, handler:any) {
        // listens even if stopPropagation
        return document.documentElement.addEventListener(eventName, handler, true);
    }

    removeListener(eventName:string, handler:any) {
        // removes listen even if stopPropagation
        return document.documentElement.removeEventListener(
            eventName,
            handler,
            true
        );
    }

    flashClass($el:any, className:any) {
        $el
            .addClass(className)
            .delay(200)
            .queue(() => $el.removeClass(className).dequeue());
    }
}
