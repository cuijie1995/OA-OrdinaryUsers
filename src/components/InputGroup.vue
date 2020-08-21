<template>
    <div class="input_group">
        <label :for="name">{{label}}</label>
        <input :type="type" :value="value" :placeholder="placeholder" :name='name'
            @input="$emit('input', $event.target.value)" />
    </div>
</template>
<script>
    export default {
        name: "input_group",
        props: {
            type: {
                type: String,
                default: "text"
            },
            value: String,
            placeholder: String,
            name: String,
            label: String
        }
    };
</script>

<style scoped>
    .input_group {
        width: 100%;
        height: 8vw;
        box-sizing: border-box;
        border-bottom: 0.1vw solid #d9d9d9;
        line-height: 8vw;
    }

    .input_group input {
        display: inline-block;
        width: 65%;
        font-size: 4vw;
        border: none;
        outline: none;
        height: 100%;
        background: none !important;
        padding-left: 5%;
        color: #ffffff;
    }

    input:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
        -webkit-text-fill-color: #ededed !important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s;
    }

    input {
        background-color: transparent;
    }
</style>