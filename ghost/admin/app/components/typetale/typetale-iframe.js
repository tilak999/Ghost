import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject} from 'ghost-admin/decorators/inject';
import {task, timeout} from 'ember-concurrency';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';

export default class TypetaleIframeComponent extends Component {
    @inject config;
    @service feature;
    @tracked isInvisible = this.args.invisibleUntilLoaded;

    willDestroy() {
        super.willDestroy?.(...arguments);
        if (this.messageListener) {
            window.removeEventListener('message', this.messageListener);
        }
        this.args.onDestroyed?.();
    }

    get srcUrl() {
        let srcUrl = new URL("http://none.local")
        if(this.args.pageId === "analytics") {
            srcUrl = new URL(`${this.config.hostSettings.typetale.analyticsUrl}`);
        } else if(this.args.pageId === "console") {
            srcUrl = new URL(`${this.config.hostSettings.typetale.consoleUrl}`);
        }
        var search_params = srcUrl.searchParams;
        search_params.set("dark", this.feature.nightShift)
        srcUrl.search = search_params.toString();
        return srcUrl.href;
    }

    @action
    resetSrcAttribute(iframe) {
        // reset the src attribute and force reload each time the guid changes
        // - allows for a click on the navigation item to reset back to the homepage
        //   or a portal preview modal to force a reload so it can fetch server-side data
        if (this.args.guid !== this._lastGuid) {
            if (iframe) {
                if (this.args.invisibleUntilLoaded) {
                    this.isInvisible = true;
                }

                try {
                    if (iframe.contentWindow.location.href !== this.srcUrl) {
                        iframe.contentWindow.location = this.srcUrl;
                    } else {
                        iframe.contentWindow.location.reload();
                    }
                } catch (e) {
                    if (e.name === 'SecurityError') {
                        iframe.src = this.srcUrl;
                    }
                }
            }
        }
        this._lastGuid = this.args.guid;
    }

    @action
    onLoad(event) {
        this.iframe = event.target;

        if (this.args.invisibleUntilLoaded && typeof this.args.invisibleUntilLoaded === 'boolean') {
            this.makeVisible.perform();
        } else {
            this.args.onLoad?.(this.iframe);
        }
    }

    @task
    *makeVisible() {
        // give any scripts a bit of time to render before making visible
        // allows portal to render it's overlay and prevent site background flashes
        yield timeout(100);
        this.isInvisible = false;
        this.args.onLoad?.(this.iframe);
    }
}
