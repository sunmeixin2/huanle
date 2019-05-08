package com.huanle.Util;


import org.apache.commons.lang.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * 文件上传工具包
 */
public class FileUtil {

//    public static String PATH = "/home/sunmeixin/JAVA/SpringBoot/image";
    public static String PATH = "/picture";
    public static String root =  "/home/sunmeixin/JAVA/SpringBoot/huanle/src/main/resources/static";

    /**
         *
         * @param file 文件
         * @param fileName 源文件名
         * @return
         */
    public static Boolean upload(MultipartFile file,String fileName){

        String localPath = root +PATH + "/";
        if(file.isEmpty()){
            return false;
        }

        File dest = new File(localPath+fileName);

        if(!dest.getParentFile().exists()){
            dest.getParentFile().mkdir();
        }
        try {
            file.transferTo(dest);
            return true;
        }catch (IllegalStateException e) {
            e.printStackTrace();

        }catch (IOException e){
            e.printStackTrace();
        }
        return false;

    }

    public static String uploadFile(MultipartFile[] files){
        String[] pictureArr = new String[files.length] ;
        String pictureImg = "";
        int i = 0;
        for(MultipartFile file:files) {
            String fileName = file.getOriginalFilename();
            fileName = getNewFileName(fileName);
            if (FileUtil.upload(file, fileName)) {
                pictureArr[i++] = fileName;//文件名保存数组中
            }

        }
        if(pictureArr.length > 0){
            pictureImg = StringUtils.join(pictureArr,",");
            return pictureImg;
        }
        return null;

    }


    public static String getSuffix(String fileName){
        return fileName.substring(fileName.lastIndexOf("."));
    }

    /**
     * 生成新的文件名
     * @param fileOriginName 源文件名
     * @return
     */
    public static String getNewFileName(String fileOriginName){ return UUIDUtil.getUUID() + getSuffix(fileOriginName); }




}
