
// importScripts('/static/js/feeds/ws_config.js');
// importScripts('/static/js/socket.io.min.js');
window.importScripts('/js/socket.io.min.js'); // This should work if the file is in the public/js directory
var inbound_fields = ["oid", "em", "os", "et", "ap", "or", "sym", "lq", "q", "dq", "ot", "rid", "cq", "tif", "ac", "td", "cc", "uid", "cid"];
var broker_dealer_trade_field = ["did", "tv", "bv", "sv", "nv", "tvl", "bt", "st", "tt", "bo", "so", "to"];
var outbond_order_chache_field = ["ex", "oid", "otm", "cid", "os", "osd", "cc", "oin", "tid", "lr", "q", "dq", "ot", "uid", "rid", "cq", "et", "ac", "td"];
var cln_trades_field = ["did", "cid", "uid", "tv", "bv", "sv", "nv", "tvl", "bt", "st", "tt", "bo", "so", "to"];
var limit_request_field = ['id', 'rd', 'rb', 'cc', 'cn', 'amt', 'st', 'fd', 'ur', 'ra'];
var notification_sync = ['id', 't', 'd', 'st'];
var temp_dealer_assign_request = ["id", "rd", "rb", "cc", "cd", "st"];
var announcement_field = ["tt", "tx", "ca"]

var user_data = {};
var dealer_group_members = [];
var current_system_user_name = null;

var subscribed_channel = [];

var channel_and_fields = {
    // broker_inbound_limit: {
    //     active: true
    // },
    broker_inbound_reject: {
        active: true
    },
    broker_order_reject: {
        active: true
    },
    broker_order_success: {
        active: true
    },
    broker_fix_status: {
        active: true
    },
    ordr_in: {
        active: true
    },
    ordr_out: {
        fields: outbond_order_chache_field,
        active: true
    },
    // dlr_trades: {
    //     fields: broker_dealer_trade_field,
    //     active: true
    // },
    // cln_trades: {
    //     fields: cln_trades_field,
    //     active: true
    // },
    // broker_ticker_trades: {
    //     fields: ["symbol", "board", "dealer_id", "client_id", "trade_value", "trade_qty", "buy_qty", "sell_qty", "total_qty", "buy_value", "sell_value", "net_value", "total_value", "buy_trades", "sell_trades", "total_trades", "buy_orders", "sell_orders", "total_orders"],
    //     active: true
    // },
    // broker_branch_trades: {
    //     fields: ["branch", "trade_value", "buy_value", "sell_value", "net_value", "total_value", "buy_trades", "sell_trades", "total_trades", "buy_orders", "sell_orders", "total_orders"],
    //     active: true
    // },
    // broker_broker_trades: {
    //     fields: ["trade_value", "buy_value", "sell_value", "net_value", "total_value", "buy_trades", "sell_trades", "total_trades", "buy_orders", "sell_orders", "total_orders"],
    //     active: true
    // },
    rms_update: {
        fields: ["update_type", "msg"],
        active: false
    },
    logout_all: {
        fields: ["device"],
        active: true
    },
    notification_sync: {
        fields: notification_sync,
        active: true
    },
    announcement: {
        fields: announcement_field,
        active: true
    }
};
let node_socket_host = "https://ws-fix.quantbd.com/";
var socket = io(node_socket_host);
socket.on('connect', () => {
    console.log('Connected to Fix server ' + node_socket_host);
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
        // if (status ==== true) {
        //     subscribeToAllActiveChannel();
        // }
        // else {
        //     unsubscribeToAllInactiveChannel();
        // }
    }
}

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
    sendDataToMainTread(channel, msg);
});

onmessage = (msg) => {
    var msg_type = msg.data[0];
    if (msg_type === 'connect') {
        // subscribeToAllActiveChannel();
        socket.connect();
        console.log('WS FIX Channels Subscribed');
    }

    if (msg_type === 'disconnect') {
        // subscribeToAllActiveChannel();
        socket.disconnect();
        console.log('WS fix disconnected');
    }

    if (msg_type === 'subscribe_custom_user_channel') {
        let current_uesr_data = msg.data[1]
        subscribeUserChannels(current_uesr_data);
    }
}

function feed_throttle(msg, throttle_ms) {
    postMessage(msg);
}
function sendDataToMainTread(channel, msg) {
    let data_channel = channel;
    if (dealer_group_members.length <= 0) {
        data_channel = channel
    }
    else {
        if (channel.includes('ordr_in_')) {
            data_channel = "ordr_in_" + current_system_user_name
        }
        else if (channel.includes('ordr_out_')) {
            data_channel = "ordr_out_" + current_system_user_name
        }
        else if (channel.includes('dlr_trades_')) {
            data_channel = "dlr_trades_" + current_system_user_name
        }
        else if (channel.includes('cln_trades_')) {
            data_channel = "cln_trades_" + current_system_user_name
        }
        else {
            data_channel = channel
        }
    }

    if (channel.includes('announcement')) {
        data_channel = "announcement"
    }
    if (channel.includes('notification_sync')) {
        data_channel = "notification_sync"
    }

    let json_data = {
        "channel": data_channel,
        "msg": { "value": msg }
    };

    feed_throttle(json_data, 0);

}


function subscribeUserChannels(user_data) {

    dealer_group_members = user_data.trader_group_members;
    current_system_user_name = user_data.system_username;

    activeInactiveChannel("broker_order_reject", false);
    let user_role = user_data.system_user_role;
    let system_username = user_data.system_username

    addNewChannel(`announcement_${user_role}`, announcement_field, true);
    addNewChannel(`notification_sync_${user_role}`, notification_sync, true);

    if (user_role === 'brokertrader') {
        // unsubsribe reqular channel 
        activeInactiveChannel("ordr_in", false)
        activeInactiveChannel("ordr_out", false)
        // add new channel 
        addTraderChannel(system_username, user_data.trader_group_members);
    }
    else if (user_role === 'associate') {
        activeInactiveChannel("ordr_in", false)
        activeInactiveChannel("ordr_out", false)
        addAssociateChannel(system_username);
    }
    else if (user_role === 'client') {
        activeInactiveChannel("ordr_in", false)
        activeInactiveChannel("ordr_out", false)
        addClientsUsernameChannel(system_username);
    }

    if (user_role === 'brokeradmin' || user_role === 'administrator' || user_role === 'brokerexec' || user_role === 'brokerccd' || user_role === 'brokerit') {
        addNewChannel('send_limit', limit_request_field, true);
        addNewChannel('rms_update', ["update_type", "msg"], true);
        addNewChannel('update_limit', ['id', 'status'], true);
        addNewChannel('temp_dealer_assign_req', temp_dealer_assign_request, true);
        addNewChannel('temp_dealer_update', ['id', 'st'], true);
    }

    addCommonChannel(system_username)

    listen_active_channels();
};


function addCommonChannel(user_name) {
    addNewChannel("logout_user_" + user_name, ["user_name", "logout", 'device'], true)
    addNewChannel("notification_sync_" + user_name, notification_sync, true)
    addNewChannel("broker_order_reject_" + user_name, ["username", "msg"], true)
    addNewChannel("broker_order_success_" + user_name, ["username", "msg"], true)
    addNewChannel("rms_update_limit_" + user_name, ["update_type", "msg"], true)
    addNewChannel("announcement_" + user_name, announcement_field, true)
}


function addClientsUsernameChannel(username) {
    addNewChannel("ordr_out_" + username, outbond_order_chache_field, true)
    addNewChannel("ordr_in_" + username, inbound_fields, true)
    addNewChannel("cln_trades_" + username, cln_trades_field, true)

}

function addTraderChannel(dealer_id, trader_group_members) {
    // add new channels
    addNewChannel("ordr_in_" + dealer_id, inbound_fields, true)
    addNewChannel("dlr_trades_" + dealer_id, broker_dealer_trade_field, true)
    addNewChannel("cln_trades_" + dealer_id, cln_trades_field, true)
    addNewChannel("ordr_out_" + dealer_id, outbond_order_chache_field, true)
    if (trader_group_members.length > 0) {
        trader_group_members.forEach(team_dealer_id => {
            addNewChannel("ordr_in_" + team_dealer_id, inbound_fields, true)
            addNewChannel("ordr_out_" + team_dealer_id, outbond_order_chache_field, true)
            // addNewChannel("dlr_trades_"+team_dealer_id,broker_dealer_trade_field,true)
            // addNewChannel("cln_trades_"+team_dealer_id,cln_trades_field,true)
        })
    }
}


function addAssociateChannel(associate_id) {
    // add new channels
    addNewChannel("ordr_in_" + associate_id, inbound_fields, true)
    addNewChannel("ordr_out_" + associate_id, outbond_order_chache_field, true)
    addNewChannel("cln_trades_" + associate_id, cln_trades_field, true)
}

function addNewChannel(key, fields, status = true) {
    if (!channel_and_fields.hasOwnProperty(key)) {
        channel_and_fields[key] = {
            fields: fields,
            active: status
        };
    }
}
