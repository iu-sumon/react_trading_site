
window.importScripts('/js/socket.io.min.js'); // This should work if the file is in the public/js directory/ Relative to the public folder

var channel_and_fields = {
    bbo: {
        fields: ["bbo"],
        active: true
    },
    dse_md_suspended: {
        fields: ["isin", "symbol", "group"],
        active: true
    },
    cp: {
        fields: [],
        active: true
    },
    ltp: {
        fields: ["ltp"],
        active: true
    },
    news: {
        fields: ["nd", "nr", "nt", "ntx", "ntp"],
        active: true
    },
    index: {
        fields: ["index"],
        active: true
    },
    mktevent: {
        fields: ["s", "g", "e", "et", "st"],
        active: true
    },
    dse_md_news_status: {
        fields: ["engine_name", "status"],
        active: true
    },
    dse_md_index_status: {
        fields: ["engine_name", "status"],
        active: true
    },
    mkt_status: {
        fields: ["mkt_status"],
        active: true
    },
    adv_dcl: {
        fields: ["adv_dcl"],
        active: true
    }
};

var subscribed_channel = [];
var node_socket_md_host = "https://ws-md.quantbd.com/";
var socket = io(node_socket_md_host);
socket.on('connect', () => {
    console.log('Connected to MD server ' + node_socket_md_host);
    subscribed_channel = []
    listen_active_channels();
});



function activeInactiveChannel(channels, status) {
    if (channels) {
        if (Array.isArray(channels)) {
            channels.forEach(channel => {
                if (channel_and_fields.hasOwnProperty(channel)) {
                    channel_and_fields[channel].active = status;
                }
            });
        }
        else {
            if (channel_and_fields.hasOwnProperty(channels)) {
                channel_and_fields[channels].active = status;
            }

        }

        if (!status) {
            unsubscribeToAllInactiveChannel();
        }
        // if (status === true) {
        //     subscribeToAllActiveChannel();
        // }
        // else {
        //     unsubscribeToAllInactiveChannel();
        // }
    }
}


function listen_active_channels() {
    for (const channel in channel_and_fields) {
        let target_channel = channel_and_fields[channel];
        if (target_channel.active) {
            if (!subscribed_channel.includes(channel)) {
                socket.emit("subscribe", channel);
                // socket.on(channel, (msg) => {
                //     sendDataToMainTread(msg.channel,msg.msg);
                // });
            }
            subscribed_channel.push(channel);
        }
    }
}

socket.onAny((channel, msg) => {
    // console.log('Arguments:', msg);
    sendDataToMainTread(channel, msg);
});


function unsubscribeToAllInactiveChannel() {
    for (const channel in channel_and_fields) {
        let target_channel = channel_and_fields[channel];
        if (!target_channel.active) {
            if (subscribed_channel.includes(channel)) {
                socket.emit("unsubscribe", channel);
                socket.off(channel)

            }

            for (let i = subscribed_channel.length - 1; i >= 0; i--) {
                if (subscribed_channel[i] === channel) {
                    subscribed_channel.splice(i, 1);
                }
            }

            if (channel_and_fields.hasOwnProperty(channel)) {
                delete channel_and_fields[channel];
            }
        }
    }
}

onmessage = (msg) => {
    var msg_type = msg.data[0];
    if (msg_type == 'connect') {
        // subscribeToAllActiveChannel();
        socket.connect();
        console.log('WS FIX Channels Subscribed');
    }

    if (msg_type == 'disconnect') {
        // subscribeToAllActiveChannel();
        socket.disconnect();
        console.log('WS md disconnected');
    }
    // if (msg_type == 'terminate') {
    //     unsubscribeAllChannels();
    //     console.log('WS FIX Channels Unsubscribed');
    // }
    // if (msg_type == 'send_ws') {
    //     var msg_object = {
    //         'msg_type': msg.data[1],
    //         'msg': msg.data[2]
    //     };
    //     ws_client.sendMessage(JSON.stringify(msg_object));
    // }

    // if (msg_type == 'active_inactive_channel') {
    //     var data_channels = msg.data[1];
    //     var data_status = msg.data[2];
    //     activeInactiveChannel(data_channels, data_status);
    // }

    if (msg_type == 'subscribe_to_mkt_depth_channel') {
        let market_depth_channel = msg.data[1]
        subscribeMarketDepthChannels(market_depth_channel);
    }
    if (msg_type == 'subscribe_unsubscribe_ticker_channel') {
        let sub = msg.data[1]
        let ch = msg.data[2]
        subUnsubTickerChannel(sub, ch);
    }
    if (msg_type == 'subscribe_time_sales_symbol_channel') {
        let ch = msg.data[1]
        subscribeTimeSalesCh(ch);
    }

    if (msg_type == 'unsubscribe_time_sales_symbol_channel') {
        unsubscribeTimeSalesCh();
    }

    if (msg_type == 'sub_unsub_channel') {
        let channel = msg.data[1]
        let flag = msg.data[2]

        subcribeUnsubscribeCustomChannel(channel, flag);
    }
}



function subscribeMarketDepthChannels(marketDepthChannels) {
    // Filter existing market depth channels from the subscribed_channel array
    const existingMarketDepthChannels = subscribed_channel.filter(
        (channel) => channel.includes('md_mktdepth_')
    );

    // Create a Set to efficiently track subscribed market depth channels
    const subscribedMarketDepthChannels = new Set(existingMarketDepthChannels);

    // Iterate through the provided array of market depth channels
    for (const channel of marketDepthChannels) {
        if (!subscribedMarketDepthChannels.has(channel)) {
            // Channel not yet subscribed, so add it and subscribe
            subscribedMarketDepthChannels.add(channel);
            addNewChannel(channel, [], true);
        }
    }

    // Unsubscribe from any previously subscribed market depth channels that are not in the new list
    const channelsToUnsubscribe = existingMarketDepthChannels.filter(
        (channel) => !marketDepthChannels.includes(channel)
    );

    if (channelsToUnsubscribe.length > 0) {
        activeInactiveChannel(channelsToUnsubscribe, false);
    }

    listen_active_channels();
}


function subUnsubTickerChannel(sub, ch) {
    if (sub) {
        if (subscribed_channel.includes(ch)) {
            return;
        }
        else {
            addNewChannel(ch, [], true);
        }
    }
    else {
        activeInactiveChannel(ch, false);
    }

    listen_active_channels();
}

// function subscribeTimeSalesCh(ch)
// {
//     if(subscribed_channel.includes(ch))
//     {
//         return;
//     }
//     const existingTimeSalesChannel = subscribed_channel.filter(
//         (channel) => channel.includes('_tmsl_')
//     );

//     if (existingTimeSalesChannel.length > 0) {
//         activeInactiveChannel(existingTimeSalesChannel, false);
//     }

//     addNewChannel(ch,[],true);

//     listen_active_channels();

// }

function subscribeTimeSalesCh(timeSaleChannels) {
    // Filter existing Time&Sale channels from the subscribed_channel array
    const existingTimeSaleChannels = subscribed_channel.filter(
        (channel) => channel.includes('_tmsl_')
    );

    // Create a Set to efficiently track subscribed Time&Sale channels
    const subscribedTimeSaleChannels = new Set(existingTimeSaleChannels);

    // Iterate through the provided array of Time&Sale channels
    for (const channel of timeSaleChannels) {
        if (!subscribedTimeSaleChannels.has(channel)) {
            // Channel not yet subscribed, so add it and subscribe
            subscribedTimeSaleChannels.add(channel);
            addNewChannel(channel, [], true);
        }
    }

    // Unsubscribe from any previously subscribed Time&Sale channels that are not in the new list
    const channelsToUnsubscribe = existingTimeSaleChannels.filter(
        (channel) => !timeSaleChannels.includes(channel)
    );

    if (channelsToUnsubscribe.length > 0) {
        activeInactiveChannel(channelsToUnsubscribe, false);
    }

    listen_active_channels();

}

function unsubscribeTimeSalesCh() {
    const existingTimeSalesChannel = subscribed_channel.filter(
        (channel) => channel.includes('_tmsl_')
    );

    if (existingTimeSalesChannel.length > 0) {
        activeInactiveChannel(existingTimeSalesChannel, false);
    }
    listen_active_channels();
}

function feed_throttle(msg, throttle_ms) {
    postMessage(msg);
}

function subcribeUnsubscribeCustomChannel(channel, flag) {
    // if need to subscribe 
    if (flag) {
        if (subscribed_channel.includes(channel)) {
            return;
        }

        addNewChannel(channel, [], flag);

    }
    else {
        if (!subscribed_channel.includes(channel)) {
            return;
        }
        activeInactiveChannel(channel, flag);

    }

    listen_active_channels();
}

function sendDataToMainTread(channel, msg) {

    if (channel === 'ltp') {
        parserObject(msg, 'ltp', handle_ltp_data);
        return;
    }
    if (channel === 'bbo') {
        parserObject(msg, 'bbo', handle_bbo_data);
        return;
    }
    if (channel === 'index') {
        parserObject(msg, 'index', handle_index_data);
        return;
    }
    let data_channel = '';
    if (channel.includes('dse_md_mktdepth_')) {
        data_channel = "dse_md_mktdepth_custom"
        // console.log(msg)
    }
    else if (channel.includes('_tmsl_')) {
        data_channel = "time_sales_symbol_ticker"
        // console.log(msg)
    }
    else {
        data_channel = channel
    }

    let json_data = {
        "channel": data_channel,
        "msg": { "value": msg }
    };
    feed_throttle(json_data, 0);

}


function addNewChannel(key, fields, status = true) {
    if (!channel_and_fields.hasOwnProperty(key)) {
        channel_and_fields[key] = {
            fields: fields,
            active: status
        };
    }
}


function handle_ltp_data(msg) {
    let ltp = {
        "channel": 'ltp',
        "msg": msg
    };

    let chart = {
        "channel": 'live_chart',
        "msg": msg
    };

    let market_health = {
        "channel": 'market_health',
        "msg": {
            market_turnover: msg.mtvr,
            market_buy_percent: parseFloat(msg.by),
            market_sell_percent: parseFloat(msg.sl),
            market_trade: parseFloat(msg.mt),
            market_volume: msg.mv
        }
    };

    let ticker = {
        "channel": 'time_and_sales_ticker',
        "msg": {
            ltp: msg.p,
            symbol: msg.s,
            board: msg.g,
            exchange: msg.xc,
            qty: msg.eq,
            time: msg.t,
            change: msg.ch,
            change_per: msg.chp,
            side: msg.sd,
        }
    };



    feed_throttle(ltp, 0);
    feed_throttle(market_health, 0);
    feed_throttle(ticker, 0);

    if (msg.xc == 'DSE') {
        feed_throttle(chart, 0);
    }


    if (['PUBLIC', 'SPUBLIC'].includes(msg.g)) {
        let protfolio_update = {
            "channel": 'protfolio_update_ltp',
            "msg": { symbol: msg.s, board: msg.g, exchange: msg.xc, ltp: parseFloat(msg.p) }
        };
        feed_throttle(protfolio_update, 0);
    }

}

function handle_bbo_data(msg) {
    feed_throttle({ 'channel': 'bbo', 'msg': msg }, 0);
}
function handle_index_data(msg) {
    feed_throttle({ 'channel': 'index', 'msg': msg }, 0);
}



function parserObject(msg, propertyName, parseFunction) {
    const parsedData = JSON.parse(msg[propertyName]);
    if (Object.keys(parsedData).length > 0) {
        for (const key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {
                parseFunction(parsedData[key]);
            }
        }
    }
}



listen_active_channels();