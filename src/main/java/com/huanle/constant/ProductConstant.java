package com.huanle.constant;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public  class ProductConstant {

    public static final Map<Integer,String> ADVICE;

    public static final Map<Integer,String> STATUS ;

//    public static final Map<Integer,String> ORDER_STATUS;

//    public static final Map<Integer,String> IS_NEW;

//    static {
//        Map<Integer,String> tmpIsNew = new HashMap<>();
//        tmpIsNew.put(0,"全新");
//        tmpIsNew.put(9,"9成新");
//        tmpIsNew.put(8,"8成新");
//        tmpIsNew.put(7,"7成新");
//        tmpIsNew.put(6,"6成新");
//        tmpIsNew.put(5,"5成新");
//
//    }

    static {
        Map<Integer,String> tmpAdvice = new HashMap<>();
        tmpAdvice.put(1,"审核中");
        tmpAdvice.put(2,"审核通过");
        tmpAdvice.put(3,"审核失败");
        ADVICE = Collections.unmodifiableMap(tmpAdvice);
    }

    static {
        Map<Integer,String> tmpStatus = new HashMap<>();
        tmpStatus.put(1,"已发布");
        tmpStatus.put(2,"已交换");
        tmpStatus.put(3,"已下架");
        STATUS = Collections.unmodifiableMap(tmpStatus);
    }
//
//    static {
//        Map<Integer,String> tmpStatus = new HashMap<>();
//        tmpStatus.put(1,"");
//        tmpStatus.put(2,"已交换");
//        tmpStatus.put(3,"已下架");
//        ORDER_STATUS = Collections.unmodifiableMap(tmpStatus);
//    }

}
