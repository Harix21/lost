package com.lostandfound.model;

public enum ItemStatus {
    LOST("lost"),
    FOUND("found"),
    CLAIMED("claimed");

    private String value;

    ItemStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ItemStatus fromValue(String value) {
        for (ItemStatus status : ItemStatus.values()) {
            if (status.value.equalsIgnoreCase(value)) {
                return status;
            }
        }
        return LOST;
    }
}
