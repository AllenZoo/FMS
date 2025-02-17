package com.server.model.veterinary;

import java.sql.Date;

import com.server.enums.HealthStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@AllArgsConstructor
@Builder
@Getter
public class VeterinaryRecords {

    private final int tagID;

    private final int recordID;

    private final Date date;

    private final HealthStatus status;
}
